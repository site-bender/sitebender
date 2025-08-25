/**
 * Minimal compile-to-IR walker (scaffold)
 *
 * Goal: turn JSX trees containing our control markers into a tiny IR that
 * groups Element nodes and attached behaviors. This is intentionally small
 * and will be replaced by the full compiler.
 */

// Marker type imports are implicit; we duck-type via __kind to avoid coupling

export type IRNode =
	| {
		kind: "element"
		tag: string
		props: Record<string, unknown>
		children: IRNode[]
		behaviors?: BehaviorNode[]
	}
	| { kind: "text"; value: string }

export type BehaviorNode =
	| {
		kind: "conditional"
		condition?: unknown
		ifTrue: IRNode[]
		ifFalse: IRNode[]
	}
	| { kind: "validation"; when: "input" | "blur" | "submit"; rule?: unknown }
	| { kind: "on"; event: string; handler?: unknown }

type MaybeVNode = unknown

type VNode = { type?: unknown; props?: Record<string, unknown> }

const isObject = (x: unknown): x is Record<string, unknown> =>
	!!x && typeof x === "object"

const getKind = (x: unknown): string | undefined => {
	if (!isObject(x)) return undefined
	const k = x.__kind
	return typeof k === "string" ? k : undefined
}

const isValidation = (
	x: unknown,
): x is {
	__kind: "control:validation"
	when: "input" | "blur" | "submit"
	rule?: unknown
} => getKind(x) === "control:validation"

const isConditional = (
	x: unknown,
): x is {
	__kind: "control:conditional"
	condition?: unknown
	ifTrue?: unknown
	ifFalse?: unknown
} => getKind(x) === "control:conditional"

const isOn = (
	x: unknown,
): x is { __kind: "control:on"; event: string; handler?: unknown } =>
	getKind(x) === "control:on"

export default function compile(
	children?: MaybeVNode | MaybeVNode[],
): IRNode[] {
	const arr: MaybeVNode[] = Array.isArray(children)
		? children
		: children
		? [children]
		: []
	const out: IRNode[] = []

	for (const node of arr) {
		if (node === null || node === undefined || node === false) continue
		if (typeof node === "string" || typeof node === "number") {
			out.push({ kind: "text", value: String(node) })
			continue
		}

		if (isValidation(node)) {
			// Attach behavior to previous element if available, else synthesize an empty container
			const target = [...out].reverse().find((n) => n.kind === "element") as
				| IRNode
				| undefined
			const behavior: BehaviorNode = {
				kind: "validation",
				when: node.when,
				rule: node.rule,
			}
			if (target && target.kind === "element") {
				target.behaviors = [...(target.behaviors || []), behavior]
			} else {
				out.push({
					kind: "element",
					tag: "div",
					props: {},
					children: [],
					behaviors: [behavior],
				})
			}
			continue
		}

		if (isConditional(node)) {
			const condNode = node as {
				__kind: "control:conditional"
				condition?: unknown
				ifTrue?: unknown
				ifFalse?: unknown
			}
			const behavior: BehaviorNode = {
				kind: "conditional",
				condition: condNode.condition,
				ifTrue: compile(condNode.ifTrue as MaybeVNode[]),
				ifFalse: compile(condNode.ifFalse as MaybeVNode[]),
			}
			const target = [...out].reverse().find((n) => n.kind === "element") as
				| IRNode
				| undefined
			if (target && target.kind === "element") {
				target.behaviors = [...(target.behaviors || []), behavior]
			} else {
				out.push({
					kind: "element",
					tag: "div",
					props: {},
					children: [],
					behaviors: [behavior],
				})
			}
			continue
		}

		if (isOn(node)) {
			const onNode = node as { __kind: "control:on"; event: string; handler?: unknown }
			const behavior: BehaviorNode = { kind: "on", event: onNode.event, handler: onNode.handler }
			const target = [...out].reverse().find((n) => n.kind === "element") as IRNode | undefined
			if (target && target.kind === "element") {
				target.behaviors = [...(target.behaviors || []), behavior]
			} else {
				out.push({ kind: "element", tag: "div", props: {}, children: [], behaviors: [behavior] })
			}
			continue
		}

		// Assume a JSX runtime that produces { type, props } VNodes for regular elements
		if (isObject(node) && "type" in node) {
			const v = node as VNode
			const type = v.type
			const props = v.props ?? {}
			const tag = typeof type === "string"
				? type
				: (isObject(type) && "name" in type &&
						typeof (type as { name?: unknown }).name === "string")
				? (type as { name?: string }).name ?? "div"
				: "div"
			const childIR = compile(
				(props as Record<string, unknown>).children as
					| MaybeVNode
					| MaybeVNode[],
			)
			const { children: _omit, ...rest } = props
			out.push({ kind: "element", tag, props: rest, children: childIR })
			continue
		}

		// Fallback: ignore unknown nodes for now
	}

	return out
}
