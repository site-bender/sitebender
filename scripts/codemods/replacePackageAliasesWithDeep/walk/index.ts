import shouldProcess from "../shouldProcess/index.ts"

//++ Recursively walks directory yielding TypeScript and TSX files
export default async function* walk(dir: string): AsyncGenerator<string> {
	//-- [REFACTOR] For-await loop should be replaced with functional approach
	for await (const ent of Deno.readDir(dir)) {
		const p = `${dir}/${ent.name}`
		if (ent.isDirectory) {
			yield* walk(p)
		} else if (ent.isFile && shouldProcess(p)) {
			yield p
		}
	}
}

//?? [GOTCHA] Contains for-await loop that violates FP rules - marked as tech debt
//?? [EXAMPLE]
// for await (const file of walk("/src")) {
//   console.log(file) // "/src/file1.ts", "/src/dir/file2.tsx", ...
// }
