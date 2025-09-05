#!/usr/bin/env -S deno run -A
/**
 * Extracts `export const filterAttributes = (...) => { ... }` from engine element files
 * into a subfolder `filterAttributes/index.ts`, converts to a named default-exported function,
 * updates the parent file to import and re-export it.
 */
import { ensureDir } from "jsr:@std/fs/ensure-dir"
import { dirname, join, relative as relPath } from "jsr:@std/path"

const ROOT = Deno.cwd()
const ENGINE_DIR = join(ROOT, "libraries/engine/src")

function adjustImportPath(spec: string): string {
	if (spec.startsWith("../")) return "../" + spec
	if (spec.startsWith("./")) return "../" + spec
	return spec
}

// no-op

async function* walkTsFiles(dir: string): AsyncGenerator<string> {
	for await (const entry of Deno.readDir(dir)) {
		const p = join(dir, entry.name)
		if (entry.isDirectory) {
			// skip build outputs
			if (entry.name === "node_modules" || entry.name.startsWith(".")) continue
			yield* walkTsFiles(p)
		} else if (entry.isFile && entry.name.endsWith(".ts")) {
			yield p
		}
	}
}

function findFilterAttributesBlock(
	src: string,
): { start: number; end: number; head: string; param: string } | null {
	const re = /export\s+const\s+filterAttributes\s*=\s*\(/m
	const m = re.exec(src)
	if (!m) return null
	const start = m.index
	// find the opening paren index and capture params up to the closing paren of the parameter list
	const openIdx = src.indexOf("(", m.index)
	if (openIdx === -1) return null
	let i = openIdx + 1
	let depth = 1
	while (i < src.length && depth > 0) {
		const ch = src[i]
		if (ch === "(") depth++
		else if (ch === ")") depth--
		i++
	}
	const paramText = src.slice(openIdx + 1, i - 1).trim()
	// find arrow and first block brace
	const arrowIdx = src.indexOf("=>", i)
	if (arrowIdx === -1) return null
	const braceIdx = src.indexOf("{", arrowIdx)
	if (braceIdx === -1) return null
	// walk braces to match end of function body
	let j = braceIdx + 1
	let bdepth = 1
	while (j < src.length && bdepth > 0) {
		const ch = src[j]
		if (ch === "{") bdepth++
		else if (ch === "}") bdepth--
		j++
	}
	const end = j // points just after closing brace
	const head = src.slice(start, braceIdx + 1)
	return { start, end, head, param: paramText }
}

function extractTypeName(param: string): string | undefined {
	// expect something like: attributes: TypeName
	const m = /:\s*([A-Za-z0-9_.$]+)/.exec(param)
	return m?.[1]
}

async function processFile(absPath: string): Promise<boolean> {
	const text = await Deno.readTextFile(absPath)
	const block = findFilterAttributesBlock(text)
	if (!block) return false
	const { start, end, param } = block
	// collect import section
	const importLines: string[] = []
	const lines = text.split("\n")
	let importEndIdx = 0
	for (let idx = 0; idx < lines.length; idx++) {
		const l = lines[idx]
		if (/^\s*import\b/.test(l)) {
			importLines.push(l)
			importEndIdx = idx + 1
		} else if (l.trim().length === 0 && importLines.length) {
			// allow blank lines in import block
			importLines.push(l)
			importEndIdx = idx + 1
		} else if (importLines.length) {
			break
		}
	}
	// adjust import specs for deeper path
	const adjustedImports = importLines.map((l) =>
		l.replace(
			/from\s+["']([^"']+)["']/,
			(_s, spec) => `from "${adjustImportPath(String(spec))}"`,
		)
	)

	const typeName = extractTypeName(param)
	const relParent = "../index.ts"
	const importTypeLine = typeName
		? `import type { ${typeName} } from "${relParent}"
`
		: ""

	const funcBody = text.slice(
		text.indexOf("{", text.indexOf("=>", start)) + 1,
		end - 1,
	)
	const newContent = [
		...adjustedImports,
		importTypeLine,
		`export default function filterAttributes(${param}) {`,
		funcBody,
		"}",
		"",
	].join("\n")

	const parentDir = dirname(absPath)
	const childDir = join(parentDir, "filterAttributes")
	const childFile = join(childDir, "index.ts")
	await ensureDir(childDir)
	await Deno.writeTextFile(childFile, newContent)

	// update parent file: remove block and add import/re-export
	const before = text.slice(0, start)
	const after = text.slice(end)
	// ensure import present after import block
	const importInsertionPoint = importEndIdx
	const beforeLines = before.split("\n")
	beforeLines.splice(
		importInsertionPoint,
		0,
		'import filterAttributes from "./filterAttributes/index.ts"',
	)

	const updatedParent = [
		beforeLines.join("\n"),
		after,
		'\nexport { default as filterAttributes } from "./filterAttributes/index.ts"\n',
	].join("")
	await Deno.writeTextFile(absPath, updatedParent)

	console.log(
		`Refactored ${relPath(ROOT, absPath)} -> ${relPath(ROOT, childFile)}`,
	)
	return true
}

let count = 0
for await (const f of walkTsFiles(ENGINE_DIR)) {
	if (f.endsWith("/filterAttributes/index.ts")) continue
	const changed = await processFile(f)
	if (changed) count++
}
console.log(`Done. Updated ${count} files.`)
