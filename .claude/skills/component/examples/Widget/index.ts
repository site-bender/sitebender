import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

export type Props = Readonly<{
	children?: ReadonlyArray<unknown>
	[key: string]: unknown
}>

/*++
 + Custom widget component without HTML element semantics
 */
export default function Widget(props: Props): VirtualNode {
	const children = props.children || []

	return {
		_tag: "element" as const,
		tagName: "DIV",
		attributes: {},
		children: children as ReadonlyArray<VirtualNode>,
	}
}
