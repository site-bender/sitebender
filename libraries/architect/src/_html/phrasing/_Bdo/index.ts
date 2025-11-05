import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/architect/_html/types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		dir?: "ltr" | "rtl" // Required: text direction override
	}>

/*++
 + HTML bdo element wrapper for bidirectional override
 */
export default function _Bdo(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("bdo")(role)
	const attributes = {
		..._validateAttributes("bdo")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "BDO",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
