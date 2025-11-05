import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// No element-specific props
	}>

/*++
 + HTML kbd element wrapper for keyboard input
 */
export default function _Kbd(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("kbd")(role)
	const attributes = {
		..._validateAttributes("kbd")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "KBD",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
