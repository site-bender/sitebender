import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateFigureRole from "./_validateFigureRole/index.ts"

export type Props = BaseProps

/*++
 + HTML figure element wrapper for self-contained content with optional caption
 + Role validation is conditional on presence of figcaption child
 */
export default function _Figure(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props

	const roleAttrs = _validateFigureRole(children as ReadonlyArray<VirtualNode>)(
		role,
	)

	const attributes = {
		..._validateAttributes("figure")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "FIGURE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
