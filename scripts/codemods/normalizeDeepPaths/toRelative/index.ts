import * as path from "https://deno.land/std@0.224.0/path/mod.ts"

//++ Converts an absolute path to a relative import path from a source file
export default function toRelative(fromFile: string): string {
	return function withAbsoluteTarget(absoluteTarget: string): string {
		const fromDir = path.dirname(fromFile)
		let rel = path.relative(fromDir, absoluteTarget)
		// Normalize to posix separators for import specifiers
		rel = rel.replaceAll("\\", "/")
		if (!rel.startsWith(".")) rel = "./" + rel

		return rel
	}
}

//?? [EXAMPLE]
// const converter = toRelative("/project/src/file.ts")
// converter("/project/lib/utils.ts") // Returns: "../lib/utils.ts"
// converter("/project/src/helper.ts") // Returns: "./helper.ts"