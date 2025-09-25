import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

//++ Recursively walks directory yielding TypeScript files
export default async function* walk(dir: string): AsyncGenerator<string> {
	//-- [REFACTOR] For-await loop should be replaced with functional approach
	for await (const entry of Deno.readDir(dir)) {
		const p = join(dir, entry.name)
		if (entry.isDirectory) {
			yield* walk(p)
		} else if (entry.isFile && p.endsWith(".ts")) {
			yield p
		}
	}
}

//?? [GOTCHA] Contains for-await loop that violates FP rules - marked as tech debt
//?? [EXAMPLE]
// for await (const file of walk("/src")) {
//   console.log(file) // "/src/foo.ts", "/src/bar.ts", etc.
// }
