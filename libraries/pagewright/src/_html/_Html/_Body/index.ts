import type { VirtualNode } from "../../../types/index.ts"
import type { BaseProps } from "../../types/index.ts"

type Props = BaseProps

export default function _Body(props: Props): VirtualNode {
	const children = props.children || []

	return {
		_tag: "element" as const,
		tagName: "BODY",
		attributes: {},
		children: children as ReadonlyArray<VirtualNode>,
	}
}
