import type BaseProps from "../../../../../../../types/index.ts"
import type { InvestmentFund as InvestmentFundProps } from "../../../../../../../types/index.ts"

import InvestmentOrDeposit from "../index.tsx"

export type Props = InvestmentFundProps & BaseProps

export default function InvestmentFund({
	_type = "InvestmentFund",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
