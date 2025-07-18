import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BankOrCreditUnionProps from "../../../../../../types/Thing/BankOrCreditUnion/index.ts"
import type FinancialServiceProps from "../../../../../../types/Thing/FinancialService/index.ts"

import FinancialService from "../index.tsx"

// BankOrCreditUnion adds no properties to the FinancialService schema type
export type Props = BaseComponentProps<
	BankOrCreditUnionProps,
	"BankOrCreditUnion",
	ExtractLevelProps<BankOrCreditUnionProps, FinancialServiceProps>
>

export default function BankOrCreditUnion({
	schemaType = "BankOrCreditUnion",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<FinancialService
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
