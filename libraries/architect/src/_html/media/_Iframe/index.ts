import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		allow?: string // Permissions policy
		allowfullscreen?: boolean
		height?: number | string
		loading?: "eager" | "lazy"
		name?: string // Frame name
		referrerpolicy?: string
		sandbox?: string // Sandbox flags
		src?: string // Frame URL
		srcdoc?: string // Inline HTML content
		width?: number | string
	}>

/*++
 + HTML iframe element wrapper for nested browsing context
 */
export default function _Iframe(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("iframe")(role)
	const attributes = {
		..._validateAttributes("iframe")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "IFRAME",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
