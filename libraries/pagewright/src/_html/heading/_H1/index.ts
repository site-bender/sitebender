import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/pagewright/_html/types/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// TODO: Add component-specific props here
	}>

/*++
 + HTML h1 element wrapper for top-level headings
 */
export default function _H1(props: Props): VirtualNode {
	const children = props.children || []

	return {
		_tag: "element" as const,
		tagName: "H1",
		attributes: {},
		children: children as ReadonlyArray<VirtualNode>,
	}
}
