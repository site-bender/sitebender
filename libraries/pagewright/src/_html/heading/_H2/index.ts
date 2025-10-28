import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/pagewright/_html/types/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// TODO: Add component-specific props here
	}>

/*++
 + HTML h2 element wrapper for section headings
 */
export default function _H2(props: Props): VirtualNode {
	const children = props.children || []

	return {
		_tag: "element" as const,
		tagName: "H2",
		attributes: {},
		children: children as ReadonlyArray<VirtualNode>,
	}
}
