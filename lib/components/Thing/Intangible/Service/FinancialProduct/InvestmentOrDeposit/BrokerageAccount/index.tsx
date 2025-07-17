import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type BrokerageAccountProps from "../../../../../../../types/Thing/BrokerageAccount/index.ts"
import type InvestmentOrDepositProps from "../../../../../../../types/Thing/InvestmentOrDeposit/index.ts"

import InvestmentOrDeposit from "../index.tsx"

// BrokerageAccount adds no properties to the InvestmentOrDeposit schema type
export type Props = BaseComponentProps<
	BrokerageAccountProps,
	"BrokerageAccount",
	ExtractLevelProps<BrokerageAccountProps, InvestmentOrDepositProps>
>

export default function BrokerageAccount({
	schemaType = "BrokerageAccount",
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
