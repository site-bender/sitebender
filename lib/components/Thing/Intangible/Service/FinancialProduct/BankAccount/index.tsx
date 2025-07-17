import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BankAccountProps from "../../../../../../types/Thing/BankAccount/index.ts"
import type FinancialProductProps from "../../../../../../types/Thing/FinancialProduct/index.ts"

import FinancialProduct from "../index.tsx"

export type Props = BaseComponentProps<
	BankAccountProps,
	"BankAccount",
	ExtractLevelProps<BankAccountProps, FinancialProductProps>
>

export default function BankAccount(
	{
		accountMinimumInflow,
		accountOverdraftLimit,
		bankAccountType,
		schemaType = "BankAccount",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<FinancialProduct
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				accountMinimumInflow,
				accountOverdraftLimit,
				bankAccountType,
				...subtypeProperties,
			}}
		/>
	)
}
