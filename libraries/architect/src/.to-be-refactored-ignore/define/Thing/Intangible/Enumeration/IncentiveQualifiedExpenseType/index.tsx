import type BaseProps from "../../../../../../types/index.ts"
import type { IncentiveQualifiedExpenseType as IncentiveQualifiedExpenseTypeProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = IncentiveQualifiedExpenseTypeProps & BaseProps

export default function IncentiveQualifiedExpenseType({
	_type = "IncentiveQualifiedExpenseType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
