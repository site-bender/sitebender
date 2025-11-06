import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		height?: number | string
		src?: string // Embedded resource URL
		type?: string // MIME type
		width?: number | string
	}>

/*++
 + HTML embed element wrapper for embedded external content
 + Note: Void element (self-closing)
 */
export default function _Embed(props: Props): VirtualNode {
	const { role, ...attrs } = props
	const roleAttrs = _validateRole("embed")(role)
	const attributes = {
		..._validateAttributes("embed")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "EMBED",
		attributes,
		children: [],
	}
}
