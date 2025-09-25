import shouldProcess from "../shouldProcess/index.ts"

//++ Recursively walks a directory and collects TypeScript/TSX files
export default function walk(dir: string) {
	return async function collectFiles(out: string[] = []): Promise<string[]> {
		//-- [REFACTOR] For-await loop should be replaced with functional approach
		for await (const ent of Deno.readDir(dir)) {
			const p = `${dir}/${ent.name}`
			if (ent.isDirectory) {
				await walk(p)(out)
			} else if (ent.isFile && shouldProcess(p)) {
				out.push(p)
			}
		}

		return out
	}
}

//?? [GOTCHA] Contains for-await loop that violates FP rules - marked as tech debt
//?? [EXAMPLE]
// const walker = walk("/src")
// const files = await walker([])
// // Returns: ["/src/file1.ts", "/src/dir/file2.tsx", ...]
