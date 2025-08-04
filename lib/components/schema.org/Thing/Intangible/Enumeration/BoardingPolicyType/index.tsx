import type BaseProps from "../../../../../types/index.ts"
import type { BoardingPolicyType as BoardingPolicyTypeProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BoardingPolicyTypeProps & BaseProps

export default function BoardingPolicyType({
	_type = "BoardingPolicyType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
