import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "../types/index.ts"
import _validateAttributes from "../_validateAttributes/index.ts"

export type Props = BaseProps

/*++
 + Html component - Root HTML element wrapper
 */
export default function _Html(props: Props): VirtualNode {
	const { children = [], ...attrs } = props
	const attributes = _validateAttributes("html")(attrs)

	return {
		_tag: "element" as const,
		tagName: "HTML",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
