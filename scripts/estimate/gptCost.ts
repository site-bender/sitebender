#!/usr/bin/env -S deno run --allow-env
// Estimate monthly GPT API costs for coding tasks.
// Usage examples:
//   deno run -A scripts/estimate/gptCost.ts --in-rate 10 --out-rate 30 --light 30 --medium 10 --heavy 2 --fx 1.7
// Flags:
//   --in-rate USD per 1M input tokens
//   --out-rate USD per 1M output tokens
//   --cached-in-rate USD per 1M cached input tokens (optional)
//   --cached-in-share share of input tokens cached (0..1, optional)
//   --light / --medium / --heavy  counts per month (runs)
//   --fx USD→NZD conversion rate (optional)
// Defaults: in=10, out=30, cached-in-rate=in-rate, cached-in-share=0, light=30, medium=10, heavy=2, fx unset

function getFlag(name: string, def?: string): string | undefined {
	const idx = Deno.args.indexOf(`--${name}`)
	if (idx >= 0 && Deno.args[idx + 1]) return Deno.args[idx + 1]
	return def
}

function toNum(v: string | undefined, def: number): number {
	if (!v) return def
	const n = Number(v)
	return Number.isFinite(n) ? n : def
}

const inRate = toNum(getFlag("in-rate"), 10) // USD per 1M input
const outRate = toNum(getFlag("out-rate"), 30) // USD per 1M output
const cachedInRate = toNum(getFlag("cached-in-rate"), inRate)
const cachedShare = Math.min(
	1,
	Math.max(0, toNum(getFlag("cached-in-share"), 0)),
)

const light = toNum(getFlag("light"), 30)
const medium = toNum(getFlag("medium"), 10)
const heavy = toNum(getFlag("heavy"), 2)

// Token footprints per run (approx, coding agents)
// Light: imports/comments-only — 20K in, 2K out
// Medium: tests/style across small folder — 60K in, 6K out
// Heavy: complex refactor/implementation — 150K in, 12K out
const TOKENS = {
	light: { in: 20_000, out: 2_000 },
	medium: { in: 60_000, out: 6_000 },
	heavy: { in: 150_000, out: 12_000 },
}

const totalIn = light * TOKENS.light.in + medium * TOKENS.medium.in +
	heavy * TOKENS.heavy.in
const totalOut = light * TOKENS.light.out + medium * TOKENS.medium.out +
	heavy * TOKENS.heavy.out

const effectiveInRate = (1 - cachedShare) * inRate + cachedShare * cachedInRate
const costUSD = (totalIn / 1_000_000) * effectiveInRate +
	(totalOut / 1_000_000) * outRate
const fx = getFlag("fx")
const rate = fx ? Number(fx) : undefined
const costNZD = rate ? costUSD * rate : undefined

console.log(JSON.stringify(
	{
		inputTokens: totalIn,
		outputTokens: totalOut,
		usd: Number(costUSD.toFixed(2)),
		nzd: costNZD !== undefined ? Number(costNZD.toFixed(2)) : undefined,
		assumptions: {
			inRatePer1M: inRate,
			cachedInRatePer1M: cachedInRate,
			cachedInShare: cachedShare,
			outRatePer1M: outRate,
			light,
			medium,
			heavy,
			profiles: TOKENS,
		},
	},
	null,
	2,
))
