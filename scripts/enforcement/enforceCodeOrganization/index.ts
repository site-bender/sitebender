/*++
 + Enforces code organization and whitespace rules.
 + Analyzes TypeScript/TSX files and fixes violations of 7 organization rules.
 + Can run in check mode (report only) or fix mode (apply changes with confirmation).
 */

import { walk } from "https://deno.land/std@0.220.1/fs/walk.ts"
import { relative } from "https://deno.land/std@0.220.1/path/mod.ts"

type Violation = {
	readonly file: string
	readonly line: number
	readonly code: string
	readonly message: string
}

type FixResult = {
	readonly file: string
	readonly originalContent: string
	readonly fixedContent: string
	readonly violations: ReadonlyArray<Violation>
}

/*++
 + Determines if an import line is a type import.
 */
function isTypeImport(line: string): boolean {
	return line.trim().startsWith("import type")
}

/*++
 + Determines if an import line is internal (relative or @sitebender).
 */
function isInternalImport(line: string): boolean {
	const fromMatch = line.match(/from\s+["']([^"']+)["']/)
	if (!fromMatch) return false

	const source = fromMatch[1]
	return source.startsWith(".") || source.startsWith("@sitebender/")
}

/*++
 + Determines if an import line is a named import.
 */
function isNamedImport(line: string): boolean {
	return /import\s+\{/.test(line)
}

/*++
 + Determines if an import line is a default import.
 */
function isDefaultImport(line: string): boolean {
	return /import\s+\w/.test(line) && !isNamedImport(line) && !isTypeImport(line)
}

/*++
 + Gets the import category for sorting.
 + Returns: 1-8 based on type/source/style.
 */
function getImportCategory(line: string): number {
	const isType = isTypeImport(line)
	const isInternal = isInternalImport(line)
	const isNamed = isNamedImport(line)
	const isDefault = isDefaultImport(line)

	if (isType && !isInternal) return 1
	if (isType && isInternal) return 2
	if (isNamed && !isInternal) return 3
	if (isDefault && !isInternal) return 5
	if (isNamed && isInternal) return 6
	if (isDefault && isInternal) return 8

	return 4
}

/*++
 + Organizes imports by category with blank lines between groups.
 */
function organizeImports(lines: ReadonlyArray<string>): ReadonlyArray<string> {
	const importLines: Array<string> = []
	const otherLines: Array<string> = []
	let inImportSection = true

	lines.reduce(
		function categorizeLines(_: null, line: string): null {
			const trimmed = line.trim()

			if (inImportSection && (trimmed.startsWith("import ") || trimmed === "")) {
				importLines.push(line)
			} else {
				inImportSection = false
				otherLines.push(line)
			}

			return null
		},
		null as null,
	)

	const actualImports = importLines.filter(function isNotBlank(line: string): boolean {
		return line.trim() !== ""
	})

	const sorted = [...actualImports].sort(function compareImports(a: string, b: string): number {
		return getImportCategory(a) - getImportCategory(b)
	})

	const grouped: Array<string> = []
	let lastCategory = -1

	sorted.reduce(
		function groupImports(_: null, line: string): null {
			const category = getImportCategory(line)

			if (lastCategory !== -1 && category !== lastCategory) {
				grouped.push("")
			}

			grouped.push(line)
			lastCategory = category

			return null
		},
		null as null,
	)

	if (grouped.length > 0 && otherLines.length > 0) {
		grouped.push("")
	}

	return grouped.concat(otherLines)
}

/*++
 + Removes consecutive duplicate blank lines.
 */
function removeMultipleBlankLines(lines: ReadonlyArray<string>): ReadonlyArray<string> {
	const result: Array<string> = []
	let lastWasBlank = false

	lines.reduce(
		function filterBlanks(_: null, line: string): null {
			const isBlank = line.trim() === ""

			if (!isBlank || !lastWasBlank) {
				result.push(line)
			}

			lastWasBlank = isBlank
			return null
		},
		null as null,
	)

	return result
}

/*++
 + Removes blank lines at start and end of blocks.
 */
function removeBlockEdgeSpacing(lines: ReadonlyArray<string>): ReadonlyArray<string> {
	const result: Array<string> = []

	lines.reduce(
		function processLine(state: { index: number }, line: string): { index: number } {
			const nextIndex = state.index + 1
			const prevLine = state.index > 0 ? lines[state.index - 1] : null
			const nextLine = nextIndex < lines.length ? lines[nextIndex] : null

			const isBlank = line.trim() === ""
			const prevEndsWithBrace = prevLine?.trim().endsWith("{")
			const nextStartsWithBrace = nextLine?.trim().startsWith("}")

			if (isBlank && (prevEndsWithBrace || nextStartsWithBrace)) {
				return { index: nextIndex }
			}

			result.push(line)
			return { index: nextIndex }
		},
		{ index: 0 },
	)

	return result
}

/*++
 + Detects multi-line value statements (not control flow blocks).
 + Only detects const/let declarations, return statements, or assignments.
 */
function isMultilineStatement(
	lines: ReadonlyArray<string>,
	startIndex: number,
): boolean {
	const line = lines[startIndex]
	const trimmed = line.trim()

	if (trimmed === "") return false

	const isControlFlow = /^\s*(if|else|for|while|switch|try|catch|finally|function|export\s+default\s+function)\s*[({]/.test(line)
	if (isControlFlow) return false

	const isValueDeclaration = /^\s*(const|let|return)\s+/.test(line) ||
		/=\s*[({[]$/.test(trimmed)
	if (!isValueDeclaration) return false

	const opensWithBrace = /[({[]$/.test(trimmed)
	if (!opensWithBrace) return false

	let braceCount = 0
	const openBraces = trimmed.match(/[({[]/g)?.length || 0
	const closeBraces = trimmed.match(/[)\]}]/g)?.length || 0
	braceCount = openBraces - closeBraces

	if (braceCount <= 0) return false

	for (let i = startIndex + 1; i < lines.length && i < startIndex + 20; i++) {
		const nextLine = lines[i]
		const nextOpen = nextLine.match(/[({[]/g)?.length || 0
		const nextClose = nextLine.match(/[)\]}]/g)?.length || 0
		braceCount += nextOpen - nextClose

		if (braceCount <= 0) {
			return i > startIndex
		}
	}

	return false
}

/*++
 + Adds spacing around multi-line statements.
 */
function addMultilineSpacing(lines: ReadonlyArray<string>): ReadonlyArray<string> {
	const result: Array<string> = []

	lines.reduce(
		function processLine(state: { index: number }, line: string): { index: number } {
			const nextIndex = state.index + 1
			const prevLine = state.index > 0 ? lines[state.index - 1] : null
			const nextLine = nextIndex < lines.length ? lines[nextIndex] : null

			const isBlank = line.trim() === ""
			const prevIsBlank = prevLine?.trim() === ""
			const nextIsBlank = nextLine?.trim() === ""

			const isMultiline = isMultilineStatement(lines, state.index)

			if (isMultiline && !prevIsBlank && prevLine !== null) {
				result.push("")
			}

			result.push(line)

			if (isMultiline && !nextIsBlank && nextLine !== null && !isBlank) {
				result.push("")
			}

			return { index: nextIndex }
		},
		{ index: 0 },
	)

	return result
}

/*++
 + Consolidates repeated single-line comments into block comments.
 */
function consolidateComments(lines: ReadonlyArray<string>): ReadonlyArray<string> {
	const result: Array<string> = []
	const commentBuffer: Array<string> = []

	function flushComments(): void {
		if (commentBuffer.length === 0) return

		if (commentBuffer.length === 1) {
			result.push(commentBuffer[0])
		} else {
			const indent = commentBuffer[0].match(/^\s*/)?.[0] || ""
			result.push(`${indent}/*++`)

			commentBuffer.reduce(
				function addComment(_: null, comment: string): null {
					const content = comment.replace(/^\s*\/\/\+\+\s*/, "").trim()
					result.push(`${indent} + ${content}`)
					return null
				},
				null as null,
			)

			result.push(`${indent} */`)
		}

		commentBuffer.length = 0
	}

	lines.reduce(
		function processLine(_: null, line: string): null {
			const trimmed = line.trim()

			if (trimmed.startsWith("//++")) {
				commentBuffer.push(line)
			} else {
				flushComments()
				result.push(line)
			}

			return null
		},
		null as null,
	)

	flushComments()
	return result
}

/*++
 + Adds blank lines before return statements.
 */
function addReturnSpacing(lines: ReadonlyArray<string>): ReadonlyArray<string> {
	const result: Array<string> = []

	lines.reduce(
		function processLine(state: { index: number }, line: string): { index: number } {
			const nextIndex = state.index + 1
			const prevLine = state.index > 0 ? lines[state.index - 1] : null

			const trimmed = line.trim()
			const isReturn = trimmed.startsWith("return ")
			const prevIsBlank = prevLine?.trim() === ""

			if (isReturn && !prevIsBlank && prevLine !== null) {
				result.push("")
			}

			result.push(line)
			return { index: nextIndex }
		},
		{ index: 0 },
	)

	return result
}

/*++
 + Applies all organization fixes to file content.
 */
function fixFileContent(content: string): string {
	const lines = content.split("\n")

	const step1 = organizeImports(lines)
	const step2 = removeMultipleBlankLines(step1)
	const step3 = removeBlockEdgeSpacing(step2)
	const step4 = addMultilineSpacing(step3)
	const step5 = consolidateComments(step4)
	const step6 = addReturnSpacing(step5)
	const step7 = removeMultipleBlankLines(step6)

	return step7.join("\n")
}

/*++
 + Detects violations in a file without fixing.
 */
function detectViolations(file: string, content: string): ReadonlyArray<Violation> {
	const violations: Array<Violation> = []
	const lines = content.split("\n")

	lines.reduce(
		function checkLine(state: { index: number; lastWasBlank: boolean }, line: string): { index: number; lastWasBlank: boolean } {
			const lineNumber = state.index + 1
			const isBlank = line.trim() === ""

			if (isBlank && state.lastWasBlank) {
				violations.push({
					file,
					line: lineNumber,
					code: "PROXIMITY_ONE_BLANK_MAX_001",
					message: "Multiple consecutive blank lines",
				})
			}

			return { index: state.index + 1, lastWasBlank: isBlank }
		},
		{ index: 0, lastWasBlank: false },
	)

	return violations
}

/*++
 + Processes a single file.
 */
async function processFile(filePath: string, checkOnly: boolean): Promise<FixResult | null> {
	const content = await Deno.readTextFile(filePath)
	const fixed = fixFileContent(content)

	if (content === fixed) return null

	const violations = detectViolations(filePath, content)

	if (checkOnly) {
		return { file: filePath, originalContent: content, fixedContent: fixed, violations }
	}

	await Deno.writeTextFile(filePath, fixed)
	return { file: filePath, originalContent: content, fixedContent: fixed, violations }
}

/*++
 + Walks directory and finds all TypeScript files.
 */
async function findFiles(path: string): Promise<ReadonlyArray<string>> {
	const files: Array<string> = []

	const stat = await Deno.stat(path)

	if (stat.isFile) {
		return [path]
	}

	for await (
		const entry of walk(path, {
			exts: [".ts", ".tsx"],
			includeDirs: false,
		})
	) {
		files.push(entry.path)
	}

	return files
}

/*++
 + Main enforcement function.
 */
export default async function enforceCodeOrganization(args: ReadonlyArray<string> = Deno.args): Promise<void> {
	const checkOnly = args.includes("--check")
	const paths = args.filter(function isNotFlag(arg: string): boolean {
		return !arg.startsWith("--")
	})

	if (paths.length === 0) {
		console.error("Usage: deno run --allow-read --allow-write index.ts [--check] <path>")
		Deno.exit(1)
	}

	const allFiles: Array<string> = []

	for (const path of paths) {
		const files = await findFiles(path)
		allFiles.push(...files)
	}

	console.log(`🔍 Analyzing ${allFiles.length} files...\n`)

	const results: Array<FixResult> = []

	for (const file of allFiles) {
		const result = await processFile(file, checkOnly)
		if (result) results.push(result)
	}

	if (results.length === 0) {
		console.log("✅ No violations found!")
		return
	}

	console.log(`\n📋 Found violations in ${results.length} files:\n`)

	results.reduce(
		function printResult(_: null, result: FixResult): null {
			const relativePath = relative(Deno.cwd(), result.file)
			console.log(`  ${relativePath}`)
			return null
		},
		null as null,
	)

	if (checkOnly) {
		console.log(`\n❌ ${results.length} files have violations (use without --check to fix)`)
		Deno.exit(1)
	}

	console.log(`\n✅ Fixed ${results.length} files`)
}

if (import.meta.main) {
	await enforceCodeOrganization()
}
