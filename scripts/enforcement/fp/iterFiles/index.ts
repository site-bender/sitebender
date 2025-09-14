import pipe from "@sitebender/toolkit/pipe/index.ts"
import map from "@sitebender/toolkit/lifted/map/index.ts"
import filter from "@sitebender/toolkit/lifted/filter/index.ts"
import forEach from "@sitebender/toolkit/lifted/forEach/index.ts"
import split from "@sitebender/toolkit/vanilla/string/split/index.ts"
import trim from "@sitebender/toolkit/vanilla/string/trim/index.ts"
import replace from "@sitebender/toolkit/vanilla/string/replace/index.ts"
import isNotEmpty from "@sitebender/toolkit/vanilla/string/isNotEmpty/index.ts"
import not from "@sitebender/toolkit/vanilla/logic/not/index.ts"

//++ Expand simple shell globs by delegating to bash ls -1 pattern
export default async function* iterFiles(
	patterns: string[],
): AsyncGenerator<string> {
	const files = new Set<string>()

	function createCommand(raw: string) {
		const p = replace(/^['"]|['"]$/g)("")(raw)
		return new Deno.Command("bash", {
			args: ["-lc", `ls -1 ${p}`],
			stdout: "piped",
			stderr: "null",
		}).output()
	}

	const procs = pipe(
		patterns,
		map(createCommand),
		Array.from,
	)

	const outputs = await Promise.allSettled(procs)

	function processOutput(o: PromiseSettledResult<Deno.CommandOutput>) {
		if (o.status !== "fulfilled" || not(o.value.success)) {
			return
		}

		const text = new TextDecoder().decode(o.value.stdout)

		function addFile(fp: string) {
			if (not(files.has(fp))) {
				files.add(fp)
			}
		}

		pipe(
			text,
			split("\n"),
			map(trim),
			filter(isNotEmpty),
			forEach(addFile),
		)
	}

	pipe(
		outputs,
		forEach(processOutput),
	)

	for (const f of files) {
		yield f
	}
}
