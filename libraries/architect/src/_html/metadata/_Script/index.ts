import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/pagewright/_html/types/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// TODO: Add component-specific props here
	}>

/*++
 + HTML script element wrapper for JavaScript
 */
export default function _Script(props: Props): VirtualNode {
	const children = props.children || []

	return {
		_tag: "element" as const,
		tagName: "SCRIPT",
		attributes: {},
		children: children as ReadonlyArray<VirtualNode>,
	}
}
