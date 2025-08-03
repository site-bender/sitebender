import type BaseProps from "../../../../../../types/index.ts"
import type { InvestmentOrDeposit as InvestmentOrDepositProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = InvestmentOrDepositProps & BaseProps

export default function InvestmentOrDeposit({
	_type = "InvestmentOrDeposit",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
