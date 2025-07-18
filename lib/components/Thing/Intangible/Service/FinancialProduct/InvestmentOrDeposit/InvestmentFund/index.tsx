import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type InvestmentFundProps from "../../../../../../../types/Thing/InvestmentFund/index.ts"
import type InvestmentOrDepositProps from "../../../../../../../types/Thing/InvestmentOrDeposit/index.ts"

import InvestmentOrDeposit from "../index.tsx"

// InvestmentFund adds no properties to the InvestmentOrDeposit schema type
export type Props = BaseComponentProps<
	InvestmentFundProps,
	"InvestmentFund",
	ExtractLevelProps<InvestmentFundProps, InvestmentOrDepositProps>
>

export default function InvestmentFund({
	schemaType = "InvestmentFund",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<InvestmentOrDeposit
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
