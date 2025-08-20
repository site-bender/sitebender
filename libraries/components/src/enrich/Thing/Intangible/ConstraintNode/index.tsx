import type BaseProps from "../../../../types/index.ts"
import type { ConstraintNode as ConstraintNodeProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ConstraintNodeProps & BaseProps

export default function ConstraintNode({
	_type = "ConstraintNode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
