import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "../../../types/index.ts"
import type { BaseProps } from "../../types/index.ts"
import _validateAriaAttributes from "../../_validateAriaAttributes/index.ts"
import _validateAttributes from "../../_validateAttributes/index.ts"
import _validateRole from "../../_validateRole/index.ts"

type Props = BaseProps

export default function _Title(props: Props): VirtualNode {
	const { children = [], role, aria, ...attrs } = props
	const roleAttrs = _validateRole("title")(role)

	const ariaAttrs = isDefined(aria)
		? _validateAriaAttributes("title")(role)(aria)
		: {}

	const attributes = {
		..._validateAttributes("title")(attrs),
		...roleAttrs,
		...ariaAttrs,
	}

	return {
		_tag: "element" as const,
		tagName: "TITLE",
		attributes,
		children: children as ReadonlyArray<VirtualNode>,
	}
}
