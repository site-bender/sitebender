import type { VirtualNode } from "../../../types/index.ts"
import type { BaseProps } from "../../types/index.ts"

type Props = BaseProps

export default function _Title(props: Props): VirtualNode {
	const children = props.children || []

	return {
		_tag: "element" as const,
		tagName: "TITLE",
		attributes: {},
		children: children as ReadonlyArray<VirtualNode>,
	}
}
