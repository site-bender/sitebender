import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { ServiceProps } from "../../../../../../types/Thing/Intangible/Service/index.ts"
import type { FinancialProductProps } from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/index.ts"
import type { BankAccountProps } from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/BankAccount/index.ts"

import FinancialProduct from "../index.tsx"

export type Props = BaseComponentProps<
	BankAccountProps,
	"BankAccount",
	ExtractLevelProps<ThingProps, IntangibleProps, ServiceProps, FinancialProductProps>
>

export default function BankAccount({
	accountMinimumInflow,
	accountOverdraftLimit,
	bankAccountType,
	schemaType = "BankAccount",
	subtypeProperties = {},
	...props
}): Props {
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
