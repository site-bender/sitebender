import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		autoplay?: boolean
		controls?: boolean
		crossorigin?: "anonymous" | "use-credentials"
		loop?: boolean
		muted?: boolean
		preload?: "none" | "metadata" | "auto"
		src?: string
	}>

/*++
 + HTML audio element wrapper for sound content
 */
export default function _Audio(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("audio")(role)
	const attributes = {
		..._validateAttributes("audio")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "AUDIO",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
