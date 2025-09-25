import endsWith from "@sitebender/toolsmith/vanilla/string/endsWith/index.ts"

//++ Checks if a directory entry is a TypeScript or TSX file
export default function isTypeScriptFile(entry: Deno.DirEntry): boolean {
	return entry.isFile &&
		(endsWith(".ts")(entry.name) || endsWith(".tsx")(entry.name))
}
