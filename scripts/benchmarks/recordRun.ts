#!/usr/bin/env -S deno run -A
/**
 * Records a benchmark run between two commits/refs.
 * - Captures git metadata, diff stats, elapsed time
 * - Optionally runs a typecheck/test/lint suite and records PASS/FAIL
 * - Optionally estimates costs via scripts/estimate/gptCost.ts
 *
 * Usage:
 *   deno run -A scripts/benchmarks/recordRun.ts \
 *     --from HEAD~1 --to HEAD \
 *     --label "scripts step-1 on tools/" \
 *     --check "deno task type-check" \
 *     --test "deno task test" \
 *     --lint "deno task lint" \
 *     --estimate "--in-rate 1.25 --out-rate 10 --cached-in-rate 0.125 --cached-in-share 0.7 --light 30 --medium 10 --heavy 2" \
 *     --out reports/integrity/benchmarks.json
 */

import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

interface Args {
	from?: string
	to?: string
	label?: string
	check?: string
	test?: string
	lint?: string
	estimate?: string
	out?: string
}

function parseArgs(): Args {
	const out: Args = {}
	for (let i = 0; i < Deno.args.length; i++) {
		const a = Deno.args[i]
		const v = Deno.args[i + 1]
		switch (a) {
			case "--from":
				out.from = v
				i++
				break
			case "--to":
				out.to = v
				i++
				break
			case "--label":
				out.label = v
				i++
				break
			case "--check":
				out.check = v
				i++
				break
			case "--test":
				out.test = v
				i++
				break
			case "--lint":
				out.lint = v
				i++
				break
			case "--estimate":
				out.estimate = v
				i++
				break
			case "--out":
				out.out = v
				i++
				break
		}
	}
	return out
}

async function sh(cmd: string) {
	const p = new Deno.Command("/bin/zsh", { args: ["-lc", cmd] }).output()
	const { code, stdout, stderr } = await p
	return {
		code,
		out: new TextDecoder().decode(stdout),
		err: new TextDecoder().decode(stderr),
	}
}

async function gitInfo(ref: string) {
	const rev = await sh(`git rev-parse ${ref}`)
	const short = await sh(`git rev-parse --short ${ref}`)
	const msg = await sh(`git --no-pager log -1 --pretty=%s ${ref}`)
	const author = await sh(`git --no-pager log -1 --pretty=%an ${ref}`)
	const date = await sh(`git --no-pager log -1 --pretty=%ad ${ref}`)
	return {
		ref,
		commit: rev.out.trim(),
		short: short.out.trim(),
		message: msg.out.trim(),
		author: author.out.trim(),
		date: date.out.trim(),
	}
}

async function diffStats(from: string, to: string) {
	const numstat = await sh(`git --no-pager diff --numstat ${from}..${to}`)
	const files = numstat.out.trim().split("\n").filter(Boolean).map((l) => {
		const [add, del, file] = l.split(/\s+/)
		return { file, added: Number(add), deleted: Number(del) }
	})
	const totals = files.reduce((acc, f) => {
		acc.added += f.added
		acc.deleted += f.deleted
		return acc
	}, { added: 0, deleted: 0 })
	return { files, totals }
}

async function runOptional(label: string, cmd?: string) {
	if (!cmd) return undefined
	const t0 = performance.now()
	const { code, out, err } = await sh(cmd)
	const t1 = performance.now()
	return { label, cmd, code, ms: Math.round(t1 - t0), out, err }
}

async function estimateCosts(args?: string) {
	if (!args) return undefined
	const { code, out, err } = await sh(
		`deno run -A scripts/estimate/gptCost.ts ${args}`,
	)
	return { code, out, err }
}

if (import.meta.main) {
	const args = parseArgs()
	const from = args.from ?? "HEAD~1"
	const to = args.to ?? "HEAD"

	const start = await gitInfo(from)
	const end = await gitInfo(to)

	const t0 = performance.now()
	const diff = await diffStats(from, to)
	const check = await runOptional("type-check", args.check)
	const lint = await runOptional("lint", args.lint)
	const test = await runOptional("test", args.test)
	const cost = await estimateCosts(args.estimate)
	const t1 = performance.now()

	const rec = {
		label: args.label ?? "",
		startedAt: start.date,
		finishedAt: end.date,
		elapsedMs: Math.round(t1 - t0),
		from: start,
		to: end,
		diff: {
			totals: diff.totals,
			fileCount: diff.files.length,
			sample: diff.files.slice(0, 25),
		},
		gates: {
			typecheck: check ? { code: check.code, ms: check.ms } : undefined,
			lint: lint ? { code: lint.code, ms: lint.ms } : undefined,
			test: test ? { code: test.code, ms: test.ms } : undefined,
		},
		estimate: cost?.out?.trim() ?? undefined,
	}

	const json = JSON.stringify(rec, null, 2)
	if (args.out) {
		const outPath = join(Deno.cwd(), args.out)
		await Deno.mkdir(outPath.substring(0, outPath.lastIndexOf("/")), {
			recursive: true,
		})
		await Deno.writeTextFile(outPath, json)
		console.log(`Benchmark saved → ${outPath}`)
	} else {
		console.log(json)
	}
}
