import type {
	ActionNode,
	ComparatorNode,
	InjectorNode,
	OperatorNode,
} from "../../../../types/ir/index.ts"
import type { ComposeContext } from "../../../context/composeContext/index.ts"

import actions from "../../registries/actions.ts"
import comparators from "../../registries/comparators.ts"
import events from "../../registries/events.ts"
import injectors from "../../registries/injectors.ts"
import operators from "../../registries/operators.ts"
import registerPolicies from "../registerPolicies.ts"

// Helpers
const toNumber = (v: unknown): number =>
	typeof v === "number"
		? v
		: (typeof v === "string" && v.trim() !== "")
		? Number(v)
		: 0
const toString = (v: unknown): string =>
	typeof v === "string" ? v : (v === null || v === undefined) ? "" : String(v)

export default function registerDefaultExecutors(_ctx?: ComposeContext) {
	// Policies
	try {
		registerPolicies()
	} catch { /* optional: policies are additive */ }
	// Injectors
	injectors.register(
		"From.Constant",
		(node: InjectorNode) => (node.args as { value?: unknown }).value,
	)
	injectors.register(
		"From.Authenticator",
		(node: InjectorNode, ctx?: ComposeContext) => {
			// Safely read from ctx.localValues with optional dot-path
			const path = String(
				(node.args as { path?: unknown }).path ?? "user",
			)
			const root = ctx?.localValues as Record<string, unknown> | undefined
			if (!root) return undefined
			const parts = path.split(".").filter(Boolean)
			let cur: unknown = root
			for (const p of parts) {
				if (
					cur && typeof cur === "object" &&
					p in (cur as Record<string, unknown>)
				) {
					cur = (cur as Record<string, unknown>)[p]
				} else {
					return undefined
				}
			}
			return cur
		},
	)
	injectors.register("From.Element", (_node: InjectorNode) => {
		const selector = String(
			(_node.args as { selector?: unknown }).selector ?? "",
		)
		if (!selector || typeof document === "undefined") return undefined
		const el = document.querySelector(selector) as
			| HTMLInputElement
			| HTMLElement
			| null
		if (!el) return undefined
		if ("value" in el) return (el as HTMLInputElement).value
		return el.textContent ?? ""
	})
	injectors.register("From.QueryString", (node: InjectorNode) => {
		if (typeof globalThis === "undefined" || !("location" in globalThis)) {
			return undefined
		}
		// deno-lint-ignore no-explicit-any
		const href = (globalThis as any).location?.href as string | undefined
		if (!href) return undefined
		const key = String((node.args as { key?: unknown }).key ?? "")
		const params = new URL(href).searchParams
		return params.get(key)
	})
	injectors.register("From.LocalStorage", (node: InjectorNode) => {
		if (
			typeof globalThis === "undefined" || !("localStorage" in globalThis)
		) {
			return undefined
		}
		const key = String((node.args as { key?: unknown }).key ?? "")
		try {
			// deno-lint-ignore no-explicit-any
			return (globalThis as any).localStorage.getItem(key) as
				| string
				| null
		} catch {
			return undefined
		}
	})

	// Operators
	operators.register("Op.Add", async (node: OperatorNode, evalArg) => {
		const values = await Promise.all(node.args.map(evalArg))
		return values.reduce<number>((sum, v) => sum + toNumber(v), 0)
	})
	operators.register("Op.Multiply", async (node: OperatorNode, evalArg) => {
		const values = await Promise.all(node.args.map(evalArg))
		return values.reduce<number>((prod, v) => prod * toNumber(v), 1)
	})

	// Conditional operator: Op.Ternary(condition, ifTrue, ifFalse)
	operators.register("Op.Ternary", async (node: OperatorNode, evalArg) => {
		const cond = Boolean(node.args[0] ? await evalArg(node.args[0]) : false)
		if (cond) {
			return node.args[1] ? await evalArg(node.args[1]) : undefined
		}
		return node.args[2] ? await evalArg(node.args[2]) : undefined
	})

	// Comparators
	comparators.register("Is.And", async (node: ComparatorNode, evalArg) => {
		for (const arg of node.args) {
			// deno-lint-ignore no-await-in-loop
			const res = await evalArg(arg)
			if (!res) return false
		}
		return true
	})
	comparators.register("Is.Or", async (node: ComparatorNode, evalArg) => {
		for (const arg of node.args) {
			// deno-lint-ignore no-await-in-loop
			const res = await evalArg(arg)
			if (res) return true
		}
		return false
	})
	comparators.register(
		"Is.NoShorterThan",
		async (node: ComparatorNode, evalArg) => {
			const [val, min] = await Promise.all([
				node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""),
				node.args[1] ? evalArg(node.args[1]) : Promise.resolve(0),
			])
			return toString(val).length >= Number(min)
		},
	)
	comparators.register(
		"Is.NoLongerThan",
		async (node: ComparatorNode, evalArg) => {
			const [val, max] = await Promise.all([
				node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""),
				node.args[1] ? evalArg(node.args[1]) : Promise.resolve(0),
			])
			return toString(val).length <= Number(max)
		},
	)
	comparators.register(
		"Is.NotEmpty",
		async (node: ComparatorNode, evalArg) => {
			const v =
				await (node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""))
			return toString(v).length > 0
		},
	)
	comparators.register(
		"Is.EmailAddress",
		async (node: ComparatorNode, evalArg) => {
			const v =
				await (node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""))
			const s = toString(v)
			// Simple, permissive email check; no unicode punycode complexity for MVP
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
		},
	)
	comparators.register(
		"Is.EqualTo",
		async (node: ComparatorNode, evalArg) => {
			const [a, b] = await Promise.all([
				node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
				node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
			])
			return a === b
		},
	)
	comparators.register(
		"Is.UnequalTo",
		async (node: ComparatorNode, evalArg) => {
			const [a, b] = await Promise.all([
				node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
				node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
			])
			return a !== b
		},
	)
	comparators.register("Is.Not", async (node: ComparatorNode, evalArg) => {
		const v =
			await (node.args[0] ? evalArg(node.args[0]) : Promise.resolve(false))
		return !v
	})

	// String matching comparators
	comparators.register("Matches", async (node: ComparatorNode, evalArg) => {
		const [operand, pattern, flags] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(""),
			node.args[2] ? evalArg(node.args[2]) : Promise.resolve(undefined),
		])
		try {
			const re = new RegExp(
				String(pattern),
				flags ? String(flags) : undefined,
			)
			return re.test(String(operand))
		} catch (_e) {
			// Invalid regex → treat as non-match
			return false
		}
	})
	comparators.register(
		"DoesNotMatch",
		async (node: ComparatorNode, evalArg) => {
			const [operand, pattern, flags] = await Promise.all([
				node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""),
				node.args[1] ? evalArg(node.args[1]) : Promise.resolve(""),
				node.args[2] ? evalArg(node.args[2]) : Promise.resolve(undefined),
			])
			try {
				const re = new RegExp(
					String(pattern),
					flags ? String(flags) : undefined,
				)
				return !re.test(String(operand))
			} catch (_e) {
				// Invalid regex → cannot assert mismatch safely, return false
				return false
			}
		},
	)

	// Temporal comparators: Date, Time, DateTime (guarded for environments without Temporal)
	// Runtime feature detection to avoid ReferenceError in browsers lacking Temporal
	type TemporalLike = {
		PlainDate: {
			from(s: string): Temporal.PlainDate
			compare(a: Temporal.PlainDate, b: Temporal.PlainDate): number
		}
		PlainTime: {
			from(s: string): Temporal.PlainTime
			compare(a: Temporal.PlainTime, b: Temporal.PlainTime): number
		}
		PlainDateTime: {
			from(s: string): Temporal.PlainDateTime
			compare(
				a: Temporal.PlainDateTime,
				b: Temporal.PlainDateTime,
			): number
		}
	}
	const getTemporal = (): TemporalLike | undefined => {
		const g = globalThis as unknown as { Temporal?: TemporalLike }
		return typeof g !== "undefined" ? g.Temporal : undefined
	}
	const TemporalGlobal = getTemporal()
	// Only register temporal comparators if Temporal is available at runtime
	if (TemporalGlobal) {
		const T = TemporalGlobal as unknown as {
			PlainDate: {
				compare(a: Temporal.PlainDate, b: Temporal.PlainDate): number
			}
			PlainTime: {
				compare(a: Temporal.PlainTime, b: Temporal.PlainTime): number
			}
			PlainDateTime: {
				compare(
					a: Temporal.PlainDateTime,
					b: Temporal.PlainDateTime,
				): number
			}
		}
		const parseDate = (v: unknown): Temporal.PlainDate | undefined => {
			try {
				if (
					v && typeof v === "object" && "calendarId" in (v as object)
				) {
					return v as Temporal.PlainDate
				}
				const s = toString(v).trim()
				if (!s) return undefined
				// Use runtime TemporalGlobal for parsing to avoid type coupling
				return TemporalGlobal.PlainDate.from(s)
			} catch {
				return undefined
			}
		}
		const parseTime = (v: unknown): Temporal.PlainTime | undefined => {
			try {
				if (
					v && typeof v === "object" && "hour" in (v as object) &&
					"minute" in (v as object)
				) {
					return v as Temporal.PlainTime
				}
				const s = toString(v).trim()
				if (!s) return undefined
				return TemporalGlobal.PlainTime.from(s)
			} catch {
				return undefined
			}
		}
		const parseDateTime = (
			v: unknown,
		): Temporal.PlainDateTime | undefined => {
			try {
				if (
					v && typeof v === "object" && "day" in (v as object) &&
					"hour" in (v as object)
				) {
					return v as Temporal.PlainDateTime
				}
				const s = toString(v).trim()
				if (!s) return undefined
				return TemporalGlobal.PlainDateTime.from(s)
			} catch {
				return undefined
			}
		}

		// Date
		comparators.register(
			"IsAfterDate",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDate(a)
				const db = parseDate(b)
				if (!da || !db) return false
				return T.PlainDate.compare(da, db) > 0
			},
		)
		comparators.register(
			"IsBeforeDate",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDate(a)
				const db = parseDate(b)
				if (!da || !db) return false
				return T.PlainDate.compare(da, db) < 0
			},
		)
		comparators.register(
			"IsSameDate",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDate(a)
				const db = parseDate(b)
				if (!da || !db) return false
				return T.PlainDate.compare(da, db) === 0
			},
		)
		comparators.register(
			"IsNotAfterDate",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDate(a)
				const db = parseDate(b)
				if (!da || !db) return false
				return T.PlainDate.compare(da, db) <= 0
			},
		)
		comparators.register(
			"IsNotBeforeDate",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDate(a)
				const db = parseDate(b)
				if (!da || !db) return false
				return T.PlainDate.compare(da, db) >= 0
			},
		)
		comparators.register(
			"IsNotSameDate",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDate(a)
				const db = parseDate(b)
				if (!da || !db) return false
				return T.PlainDate.compare(da, db) !== 0
			},
		)

		// Time
		comparators.register(
			"IsAfterTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const ta = parseTime(a)
				const tb = parseTime(b)
				if (!ta || !tb) return false
				return T.PlainTime.compare(ta, tb) > 0
			},
		)
		comparators.register(
			"IsBeforeTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const ta = parseTime(a)
				const tb = parseTime(b)
				if (!ta || !tb) return false
				return T.PlainTime.compare(ta, tb) < 0
			},
		)
		comparators.register(
			"IsSameTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const ta = parseTime(a)
				const tb = parseTime(b)
				if (!ta || !tb) return false
				return T.PlainTime.compare(ta, tb) === 0
			},
		)
		comparators.register(
			"IsNotAfterTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const ta = parseTime(a)
				const tb = parseTime(b)
				if (!ta || !tb) return false
				return T.PlainTime.compare(ta, tb) <= 0
			},
		)
		comparators.register(
			"IsNotBeforeTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const ta = parseTime(a)
				const tb = parseTime(b)
				if (!ta || !tb) return false
				return T.PlainTime.compare(ta, tb) >= 0
			},
		)
		comparators.register(
			"IsNotSameTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const ta = parseTime(a)
				const tb = parseTime(b)
				if (!ta || !tb) return false
				return T.PlainTime.compare(ta, tb) !== 0
			},
		)

		// DateTime
		comparators.register(
			"IsAfterDateTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDateTime(a)
				const db = parseDateTime(b)
				if (!da || !db) return false
				return T.PlainDateTime.compare(da, db) > 0
			},
		)
		comparators.register(
			"IsBeforeDateTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDateTime(a)
				const db = parseDateTime(b)
				if (!da || !db) return false
				return T.PlainDateTime.compare(da, db) < 0
			},
		)
		comparators.register(
			"IsSameDateTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDateTime(a)
				const db = parseDateTime(b)
				if (!da || !db) return false
				return T.PlainDateTime.compare(da, db) === 0
			},
		)
		comparators.register(
			"IsNotAfterDateTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDateTime(a)
				const db = parseDateTime(b)
				if (!da || !db) return false
				return T.PlainDateTime.compare(da, db) <= 0
			},
		)
		comparators.register(
			"IsNotBeforeDateTime",
			async (node: ComparatorNode, evalArg) => {
				const [a, b] = await Promise.all([
					node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
					node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
				])
				const da = parseDateTime(a)
				const db = parseDateTime(b)
				if (!da || !db) return false
				return T.PlainDateTime.compare(da, db) >= 0
			},
		)
	}

	// Set membership comparator: InSet(value, set)
	comparators.register("InSet", async (node: ComparatorNode, evalArg) => {
		const [value, setVal] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
		])
		if (setVal === null || setVal === undefined) return false
		if (Array.isArray(setVal)) return setVal.some((x) => x === value)
		// deno-lint-ignore no-explicit-any
		if (setVal instanceof Set) return (setVal as Set<any>).has(value)
		if (typeof setVal === "string") {
			const parts = setVal.split(",").map((s) => s.trim())
			return parts.includes(String(value).trim())
		}
		if (typeof setVal === "object") {
			// Check values of a map-like object
			// deno-lint-ignore no-explicit-any
			return Object.values(setVal as any).some((x) => x === value)
		}
		return false
	})

	// Actions
	actions.register("Act.SetValue", async (node: ActionNode, evalArg) => {
		const [selectorVal, value] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(""),
		])
		if (typeof document === "undefined") return
		const sel = toString(selectorVal)
		const el = document.querySelector(sel) as
			| HTMLInputElement
			| HTMLElement
			| null
		if (!el) return
		if ("value" in el) (el as HTMLInputElement).value = toString(value)
		else el.textContent = toString(value)
	})
	actions.register("Act.Submit", async (node: ActionNode, evalArg) => {
		const sel = toString(node.args[0] ? await evalArg(node.args[0]) : "")
		if (!sel || typeof document === "undefined") return
		const form = document.querySelector(sel) as HTMLFormElement | null
		form?.requestSubmit?.()
	})
	actions.register(
		"Act.SetQueryString",
		async (node: ActionNode, evalArg) => {
			if (
				typeof globalThis === "undefined" ||
				!("location" in globalThis) ||
				!("history" in globalThis)
			) return
			const key = toString(
				node.args[0] ? await evalArg(node.args[0]) : "",
			)
			const val = toString(
				node.args[1] ? await evalArg(node.args[1]) : "",
			)
			// deno-lint-ignore no-explicit-any
			const href = (globalThis as any).location?.href as
				| string
				| undefined
			if (!href) return
			const url = new URL(href)
			url.searchParams.set(key, val) // deno-lint-ignore no-explicit-any
			;(globalThis as any).history.replaceState({}, "", url.toString())
		},
	)
	actions.register("Act.Publish", async (node: ActionNode, evalArg, ctx) => {
		const topic = toString(node.args[0] ? await evalArg(node.args[0]) : "")
		const payload = node.args[1] ? await evalArg(node.args[1]) : undefined
		ctx.bus.publish(topic, payload)
	})

	// Conditional action: Act.If(condition, thenAction, elseAction?)
	actions.register("Act.If", async (node: ActionNode, evalArg, ctx) => {
		const [condNode, thenNode, elseNode] = node.args as unknown[] as Array<
			{ kind?: string; action?: string }
		>
		const cond = Boolean(
			condNode ? await evalArg(condNode as unknown as ComparatorNode) : false,
		)
		const run = async (n: unknown) => {
			const a = n as { kind?: string; action?: string }
			if (!a || a.kind !== "action" || !a.action) return
			const exec = actions.get(a.action)
			if (!exec) return
			await exec(a as unknown as ActionNode, evalArg, ctx)
		}
		if (cond) await run(thenNode)
		else await run(elseNode)
	})

	// Events
	const bind = (name: string) =>
		events.register(`On.${name}`, (el, _node, dispatch) => {
			el.addEventListener(name.toLowerCase(), dispatch as EventListener)
		})
	bind("Input")
	bind("Change")
	bind("Blur")
	// Custom binder for submit: prevent default page navigation so actions control URL/state
	events.register("On.Submit", (el, _node, dispatch) => {
		el.addEventListener("submit", (e) => {
			e.preventDefault()
			void (dispatch as unknown as (e?: Event) => void)()
		})
	})
}
