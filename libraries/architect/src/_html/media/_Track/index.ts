import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		default?: boolean // Default track
		kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata"
		label?: string // User-visible label
		src?: string // Track file URL
		srclang?: string // Track language code
	}>

/*++
 + HTML track element wrapper for timed text tracks
 + Note: Void element (self-closing)
 */
export default function _Track(props: Props): VirtualNode {
	const { role, aria, ...attrs } = props
	const roleAttrs = _validateRole("track")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("track")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("track")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TRACK",
		attributes,
		children: [],
	}
}
