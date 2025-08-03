import type BaseProps from "../../../../../types/index.ts"
import type { TypeAndQuantityNode as TypeAndQuantityNodeProps } from "../../../../../types/index.ts"

import StructuredValue from "../index.tsx"

export type Props = TypeAndQuantityNodeProps & BaseProps

export default function TypeAndQuantityNode({
	_type = "TypeAndQuantityNode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
