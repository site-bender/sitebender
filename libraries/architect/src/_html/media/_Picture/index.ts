import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props = BaseProps

/*++
 + HTML picture element wrapper for responsive images
 */
export default function _Picture(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("picture")(role)
	const attributes = {
		..._validateAttributes("picture")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "PICTURE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
