import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		disabled?: boolean // Whether fieldset is disabled
		form?: string // ID of associated form
		name?: string // Name for fieldset
	}>

/*++
 + HTML fieldset element wrapper for grouping form controls
 */
export default function _Fieldset(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("fieldset")(role)
	const attributes = {
		..._validateAttributes("fieldset")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "FIELDSET",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
