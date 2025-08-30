import type {
	ActionNode,
	ComparatorNode,
	InjectorNode,
	OperatorNode,
} from "../../../../types/ir/index.ts"
import type { ComposeContext } from "../../../context/composeContext/index.ts"

import { getAction, registerAction } from "../../registries/actions.ts"
import { registerComparator } from "../../registries/comparators.ts"
import { registerEvent } from "../../registries/events.ts"
import { registerInjector } from "../../registries/injectors.ts"
import { registerOperator } from "../../registries/operators.ts"
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

export function registerDefaultExecutors(_ctx?: ComposeContext) {
	// Policies
	try { registerPolicies() } catch { /* optional: policies are additive */ }
	// Injectors
	registerInjector(
		"From.Constant",
		(node: InjectorNode) => (node.args as { value?: unknown }).value,
	)
	registerInjector("From.Element", (_node: InjectorNode) => {
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
	registerInjector("From.QueryString", (node: InjectorNode) => {
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
	registerInjector("From.LocalStorage", (node: InjectorNode) => {
		if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
			return undefined
		}
		const key = String((node.args as { key?: unknown }).key ?? "")
		try {
			// deno-lint-ignore no-explicit-any
			return (globalThis as any).localStorage.getItem(key) as string | null
		} catch {
			return undefined
		}
	})

	// Operators
	registerOperator("Op.Add", async (node: OperatorNode, evalArg) => {
		const values = await Promise.all(node.args.map(evalArg))
		return values.reduce<number>((sum, v) => sum + toNumber(v), 0)
	})
	registerOperator("Op.Multiply", async (node: OperatorNode, evalArg) => {
		const values = await Promise.all(node.args.map(evalArg))
		return values.reduce<number>((prod, v) => prod * toNumber(v), 1)
	})

	// Conditional operator: Op.Ternary(condition, ifTrue, ifFalse)
	registerOperator("Op.Ternary", async (node: OperatorNode, evalArg) => {
		const cond = Boolean(node.args[0] ? await evalArg(node.args[0]) : false)
		if (cond) {
			return node.args[1] ? await evalArg(node.args[1]) : undefined
		}
		return node.args[2] ? await evalArg(node.args[2]) : undefined
	})

	// Comparators
	registerComparator("Is.And", async (node: ComparatorNode, evalArg) => {
		for (const arg of node.args) {
			// deno-lint-ignore no-await-in-loop
			const res = await evalArg(arg)
			if (!res) return false
		}
		return true
	})
	registerComparator("Is.Or", async (node: ComparatorNode, evalArg) => {
		for (const arg of node.args) {
			// deno-lint-ignore no-await-in-loop
			const res = await evalArg(arg)
			if (res) return true
		}
		return false
	})
	registerComparator(
		"Is.NoShorterThan",
		async (node: ComparatorNode, evalArg) => {
			const [val, min] = await Promise.all([
				node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""),
				node.args[1] ? evalArg(node.args[1]) : Promise.resolve(0),
			])
			return toString(val).length >= Number(min)
		},
	)
	registerComparator(
		"Is.NoLongerThan",
		async (node: ComparatorNode, evalArg) => {
			const [val, max] = await Promise.all([
				node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""),
				node.args[1] ? evalArg(node.args[1]) : Promise.resolve(0),
			])
			return toString(val).length <= Number(max)
		},
	)
	registerComparator(
		"Is.NotEmpty",
		async (node: ComparatorNode, evalArg) => {
			const v =
				await (node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""))
			return toString(v).length > 0
		},
	)
	registerComparator(
		"Is.EmailAddress",
		async (node: ComparatorNode, evalArg) => {
			const v =
				await (node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""))
			const s = toString(v)
			// Simple, permissive email check; no unicode punycode complexity for MVP
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
		},
	)
	registerComparator("Is.EqualTo", async (node: ComparatorNode, evalArg) => {
		const [a, b] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
		])
		return a === b
	})
	registerComparator("Is.UnequalTo", async (node: ComparatorNode, evalArg) => {
		const [a, b] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
		])
		return a !== b
	})
	registerComparator("Is.Not", async (node: ComparatorNode, evalArg) => {
		const v =
			await (node.args[0] ? evalArg(node.args[0]) : Promise.resolve(false))
		return !v
	})

	// String matching comparators
	registerComparator("Matches", async (node: ComparatorNode, evalArg) => {
		const [operand, pattern, flags] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(""),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(""),
			node.args[2] ? evalArg(node.args[2]) : Promise.resolve(undefined),
		])
		try {
			const re = new RegExp(String(pattern), flags ? String(flags) : undefined)
			return re.test(String(operand))
		} catch (_e) {
			// Invalid regex → treat as non-match
			return false
		}
	})
	registerComparator(
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

	// Temporal comparators: Date, Time, DateTime
	const T = Temporal as unknown as {
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
			if (v && typeof v === "object" && "calendarId" in (v as object)) {
				return v as Temporal.PlainDate
			}
			const s = toString(v).trim()
			if (!s) return undefined
			return Temporal.PlainDate.from(s)
		} catch {
			return undefined
		}
	}
	const parseTime = (v: unknown): Temporal.PlainTime | undefined => {
		try {
			if (v && typeof v === "object" && "hour" in (v as object) && "minute" in (v as object)) {
				return v as Temporal.PlainTime
			}
			const s = toString(v).trim()
			if (!s) return undefined
			return Temporal.PlainTime.from(s)
		} catch {
			return undefined
		}
	}
	const parseDateTime = (v: unknown): Temporal.PlainDateTime | undefined => {
		try {
			if (v && typeof v === "object" && "day" in (v as object) && "hour" in (v as object)) {
				return v as Temporal.PlainDateTime
			}
			const s = toString(v).trim()
			if (!s) return undefined
			return Temporal.PlainDateTime.from(s)
		} catch {
			return undefined
		}
	}

	// Date
	registerComparator("IsAfterDate", async (node: ComparatorNode, evalArg) => {
		const [a, b] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
		])
		const da = parseDate(a)
		const db = parseDate(b)
		if (!da || !db) return false
		return T.PlainDate.compare(da, db) > 0
	})
	registerComparator("IsBeforeDate", async (node: ComparatorNode, evalArg) => {
		const [a, b] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
		])
		const da = parseDate(a)
		const db = parseDate(b)
		if (!da || !db) return false
		return T.PlainDate.compare(da, db) < 0
	})
	registerComparator("IsSameDate", async (node: ComparatorNode, evalArg) => {
		const [a, b] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
		])
		const da = parseDate(a)
		const db = parseDate(b)
		if (!da || !db) return false
		return T.PlainDate.compare(da, db) === 0
	})
	registerComparator(
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
	registerComparator(
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
	registerComparator(
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
	registerComparator("IsAfterTime", async (node: ComparatorNode, evalArg) => {
		const [a, b] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
		])
		const ta = parseTime(a)
		const tb = parseTime(b)
		if (!ta || !tb) return false
		return T.PlainTime.compare(ta, tb) > 0
	})
	registerComparator("IsBeforeTime", async (node: ComparatorNode, evalArg) => {
		const [a, b] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
		])
		const ta = parseTime(a)
		const tb = parseTime(b)
		if (!ta || !tb) return false
		return T.PlainTime.compare(ta, tb) < 0
	})
	registerComparator("IsSameTime", async (node: ComparatorNode, evalArg) => {
		const [a, b] = await Promise.all([
			node.args[0] ? evalArg(node.args[0]) : Promise.resolve(undefined),
			node.args[1] ? evalArg(node.args[1]) : Promise.resolve(undefined),
		])
		const ta = parseTime(a)
		const tb = parseTime(b)
		if (!ta || !tb) return false
		return T.PlainTime.compare(ta, tb) === 0
	})
	registerComparator(
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
	registerComparator(
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
	registerComparator(
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
	registerComparator(
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
	registerComparator(
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
	registerComparator(
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
	registerComparator(
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
	registerComparator(
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

	// Set membership comparator: InSet(value, set)
	registerComparator("InSet", async (node: ComparatorNode, evalArg) => {
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
	registerAction("Act.SetValue", async (node: ActionNode, evalArg) => {
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
	registerAction("Act.Submit", async (node: ActionNode, evalArg) => {
		const sel = toString(node.args[0] ? await evalArg(node.args[0]) : "")
		if (!sel || typeof document === "undefined") return
		const form = document.querySelector(sel) as HTMLFormElement | null
		form?.requestSubmit?.()
	})
	registerAction("Act.SetQueryString", async (node: ActionNode, evalArg) => {
		if (
			typeof globalThis === "undefined" || !("location" in globalThis) ||
			!("history" in globalThis)
		) return
		const key = toString(node.args[0] ? await evalArg(node.args[0]) : "")
		const val = toString(node.args[1] ? await evalArg(node.args[1]) : "")
		// deno-lint-ignore no-explicit-any
		const href = (globalThis as any).location?.href as string | undefined
		if (!href) return
		const url = new URL(href)
		url.searchParams.set(key, val) // deno-lint-ignore no-explicit-any
		;(globalThis as any).history.replaceState({}, "", url.toString())
	})
	registerAction("Act.Publish", async (node: ActionNode, evalArg, ctx) => {
		const topic = toString(node.args[0] ? await evalArg(node.args[0]) : "")
		const payload = node.args[1] ? await evalArg(node.args[1]) : undefined
		ctx.bus.publish(topic, payload)
	})

	// Conditional action: Act.If(condition, thenAction, elseAction?)
	registerAction("Act.If", async (node: ActionNode, evalArg, ctx) => {
		const [condNode, thenNode, elseNode] = node.args as unknown[] as Array<
			{ kind?: string; action?: string }
		>
		const cond = Boolean(
			condNode ? await evalArg(condNode as unknown as ComparatorNode) : false,
		)
		const run = async (n: unknown) => {
			const a = n as { kind?: string; action?: string }
			if (!a || a.kind !== "action" || !a.action) return
			const exec = getAction(a.action)
			if (!exec) return
			await exec(a as unknown as ActionNode, evalArg, ctx)
		}
		if (cond) await run(thenNode)
		else await run(elseNode)
	})

	// Events
	const bind = (name: string) =>
		registerEvent(`On.${name}`, (el, _node, dispatch) => {
			el.addEventListener(name.toLowerCase(), dispatch as EventListener)
		})
	bind("Input")
	bind("Change")
	bind("Blur")
	// Custom binder for submit: prevent default page navigation so actions control URL/state
	registerEvent("On.Submit", (el, _node, dispatch) => {
		el.addEventListener("submit", (e) => {
			e.preventDefault()
			void (dispatch as unknown as (e?: Event) => void)()
		})
	})
}
