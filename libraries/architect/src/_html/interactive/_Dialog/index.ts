import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		open?: boolean // Whether dialog is visible
	}>

/*++
 + HTML dialog element wrapper for modal/non-modal dialogs
 */
export default function _Dialog(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("dialog")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("dialog")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("dialog")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "DIALOG",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
