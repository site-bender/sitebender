import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		autoplay?: boolean
		controls?: boolean
		crossorigin?: "anonymous" | "use-credentials"
		height?: number
		loop?: boolean
		muted?: boolean
		playsinline?: boolean
		poster?: string // Preview image URL
		preload?: "none" | "metadata" | "auto"
		src?: string
		width?: number
	}>

/*++
 + HTML video element wrapper for video content
 */
export default function _Video(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("video")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("video")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("video")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "VIDEO",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
