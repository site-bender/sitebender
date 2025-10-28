import type { VirtualNode } from "../../../types/index.ts"
import type { BaseProps } from "../../types/index.ts"

type Props = BaseProps

export default function _Head(props: Props): VirtualNode {
	const children = props.children || []

	return {
		_tag: "element" as const,
		tagName: "HEAD",
		attributes: {},
		children: children as ReadonlyArray<VirtualNode>,
	}
}
