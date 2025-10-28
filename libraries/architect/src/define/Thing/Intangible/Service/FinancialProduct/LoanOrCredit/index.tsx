import type BaseProps from "../../../../../../../types/index.ts"
import type { LoanOrCredit as LoanOrCreditProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = LoanOrCreditProps & BaseProps

export default function LoanOrCredit({
	_type = "LoanOrCredit",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
