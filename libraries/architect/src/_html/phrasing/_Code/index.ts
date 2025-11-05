import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps} from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// No element-specific props
	}>

/*++
 + HTML code element wrapper for code fragments
 */
export default function _Code(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("code")(role)
	const attributes = {
		..._validateAttributes("code")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "CODE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
