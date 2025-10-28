//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	condition?: JSX.Element | Array<JSX.Element>
	then?: JSX.Element | Array<JSX.Element>
	else?: JSX.Element | Array<JSX.Element>
	children?: JSX.Element | Array<JSX.Element>
}

export type ConditionalMarker = {
	__kind: "control:conditional"
	condition?: JSX.Element | Array<JSX.Element>
	ifTrue: Array<JSX.Element>
	ifFalse: Array<JSX.Element>
}

type SlotMarker = {
	__kind: "slot:condition" | "slot:iftrue" | "slot:iffalse"
	children?: JSX.Element | Array<JSX.Element>
}

const toArray = (x?: JSX.Element | Array<JSX.Element>): Array<JSX.Element> =>
	x ? (Array.isArray(x) ? x : [x]) : []

export default function If(
	{ condition, then: thenBranch, else: elseBranch, children }: Props,
): ConditionalMarker {
	// If slots exist in children, prefer them.
	const arr =
		(Array.isArray(children)
			? children
			: (children ? [children] : [])) as Array<unknown>
	const slots = arr.filter((x): x is SlotMarker => {
		if (!x || typeof x !== "object") return false
		const k = (x as Record<string, unknown>).__kind
		return typeof k === "string" && k.startsWith("slot:")
	})
	const condSlot = slots.find((s) => s.__kind === "slot:condition")
	const trueSlot = slots.find((s) => s.__kind === "slot:iftrue")
	const falseSlot = slots.find((s) => s.__kind === "slot:iffalse")

	const cond = condSlot?.children ?? condition
	const ifTrue = toArray(trueSlot?.children ?? thenBranch)
	const ifFalse = toArray(falseSlot?.children ?? elseBranch)

	// If still missing branches and children were given without slots, map first/second children to then/else
	if (
		ifTrue.length === 0 && ifFalse.length === 0 && arr.length > 0 &&
		slots.length === 0
	) {
		const first = arr[0] as JSX.Element
		const second = arr[1] as JSX.Element | undefined
		return {
			__kind: "control:conditional",
			condition: cond,
			ifTrue: toArray(first),
			ifFalse: toArray(second),
		}
	}

	return { __kind: "control:conditional", condition: cond, ifTrue, ifFalse }
}
