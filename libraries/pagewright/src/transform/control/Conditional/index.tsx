//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	children?: JSX.Element | Array<JSX.Element>
}

type SlotMarker = {
	__kind: "slot:condition" | "slot:iftrue" | "slot:iffalse"
	children?: JSX.Element | Array<JSX.Element>
}

export type ConditionalMarker = {
	__kind: "control:conditional"
	condition?: JSX.Element | Array<JSX.Element>
	ifTrue: Array<JSX.Element>
	ifFalse: Array<JSX.Element>
}

export default function Conditional({ children }: Props): ConditionalMarker {
	const rawChildren: Array<unknown> = Array.isArray(children)
		? [...children]
		: (children ? [children] : [])

	const isSlot = (x: unknown): x is SlotMarker => {
		if (x && typeof x === "object") {
			const maybe = x as { __kind?: unknown }
			if (typeof maybe.__kind === "string") {
				const k = maybe.__kind
				return k === "slot:condition" || k === "slot:iftrue" ||
					k === "slot:iffalse"
			}
		}
		return false
	}

	const arr = rawChildren.filter(isSlot)
	const cond = arr.find((x) => x.__kind === "slot:condition")
	const t = arr.find((x) => x.__kind === "slot:iftrue")
	const f = arr.find((x) => x.__kind === "slot:iffalse")

	const toArray = (c?: JSX.Element | Array<JSX.Element>) =>
		c ? (Array.isArray(c) ? c : [c]) : []

	return {
		__kind: "control:conditional",
		condition: cond?.children,
		ifTrue: toArray(t?.children),
		ifFalse: toArray(f?.children),
	}
}
