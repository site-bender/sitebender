import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		"accept-charset"?: string // Character encodings to accept
		action?: string // URL for form submission
		autocomplete?: "on" | "off" // Form autocomplete setting
		enctype?:
			| "application/x-www-form-urlencoded"
			| "multipart/form-data"
			| "text/plain" // Form data encoding type
		method?: "get" | "post" | "dialog" // HTTP method
		name?: string // Form name
		novalidate?: boolean // Skip validation
		rel?: string // Relationship to target
		target?: "_self" | "_blank" | "_parent" | "_top" | string // Target browsing context
	}>

/*++
 + HTML form element wrapper for user input forms
 */
export default function _Form(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("form")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("form")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("form")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "FORM",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
