import pipe from "@sitebender/toolsmith/vanilla/combinator/pipe/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"
import replace from "@sitebender/toolsmith/vanilla/string/replace/index.ts"
import isNotEmpty from "@sitebender/toolsmith/vanilla/string/isNotEmpty/index.ts"
import includes from "@sitebender/toolsmith/vanilla/array/includes/index.ts"

//++ Expand simple shell globs by delegating to bash ls -1 pattern
export default async function iterateFiles(
    patterns: string[],
): Promise<Array<string>> {
    function createCommand(raw: string) {
        const p = replace(/^["']|["']$/g)("")(raw)
        return new Deno.Command("bash", {
            args: ["-lc", `ls -1 ${p}`],
            stdout: "piped",
            stderr: "null",
        }).output()
    }

    const procs = pipe([map(createCommand)])(patterns)

    const outputs = await Promise.allSettled(procs)

    function toLines(o: PromiseSettledResult<Deno.CommandOutput>): Array<string> {
        if (o.status !== "fulfilled" || !o.value.success) return []
        const text = new TextDecoder().decode(o.value.stdout)
    return pipe([split("\n"), map(trim), filter(isNotEmpty)])(text)
    }

    function uniq(acc: Array<string>, fp: string): Array<string> {
        return includes(fp)(acc) ? acc : [...acc, fp]
    }

    return pipe([
        map(toLines),
        reduce(
            (acc: Array<string>, arr: Array<string>) => reduce(uniq)(acc)(arr),
        )([] as Array<string>),
    ])(outputs)
}
