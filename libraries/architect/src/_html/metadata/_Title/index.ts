import type { VirtualNode } from "../../../types/index.ts"
import type { BaseProps } from "../../types/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

type Props = BaseProps

export default function _Title(props: Props): VirtualNode {
	const { children = [], role, ...attrs } = props
	const roleAttrs = _validateRole("title")(role)
	const attributes = {
		..._validateAttributes("title")(attrs),
		...roleAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TITLE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
