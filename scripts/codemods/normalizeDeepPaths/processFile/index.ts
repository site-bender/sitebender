import * as path from "https://deno.land/std@0.224.0/path/mod.ts"

import { ROOT } from "../constants/index.ts"
import existsSync from "../existsSync/index.ts"
import needsRewrite from "../needsRewrite/index.ts"
import toRelative from "../toRelative/index.ts"

//++ Processes a single file to normalize deep import paths to relative paths
export default async function processFile(filePath: string): Promise<boolean> {
	const orig = await Deno.readTextFile(filePath)
	let changed = orig

	// Match import/export ... from "..." | '...'
	const re = /(from\s*["'])([^"']+)(["'])/g

	const getRelativePath = toRelative(filePath)

	changed = changed.replace(re, function replaceImport(m, p1, spec, p3) {
		const prefix = needsRewrite(spec)
		if (!prefix) return m

		// Compute absolute target path on disk
		const absTarget = path.join(ROOT, spec)

		// If the spec points to a directory, try to resolve index.ts or index.tsx
		let target = absTarget
		try {
			const stat = Deno.statSync(absTarget)
			if (stat.isDirectory) {
				// Prefer index.ts, fallback to index.tsx
				const ts = path.join(absTarget, "index.ts")
				const tsx = path.join(absTarget, "index.tsx")
				if (existsSync(ts)) target = ts
				else if (existsSync(tsx)) target = tsx
			}
		} catch {
			// ignore, will attempt as-is
		}

		// Ensure extension is preserved as in original spec when possible
		const finalRel = getRelativePath(target)

		return `${p1}${finalRel}${p3}`
	})

	if (changed !== orig) {
		await Deno.writeTextFile(filePath, changed)

		return true
	}

	return false
}

//?? [EXAMPLE]
// await processFile("/project/src/component.ts")
// // Returns: true if file was modified, false otherwise
// // Rewrites: import { foo } from "libraries/toolsmith/src/utils"
// // To: import { foo } from "../../libraries/toolsmith/src/utils"
