import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AccountingServiceProps from "../../../../../../types/Thing/AccountingService/index.ts"
import type FinancialServiceProps from "../../../../../../types/Thing/FinancialService/index.ts"

import FinancialService from "./index.tsx"

// AccountingService adds no properties to the FinancialService schema type
export type Props = BaseComponentProps<
	AccountingServiceProps,
	"AccountingService",
	ExtractLevelProps<AccountingServiceProps, FinancialServiceProps>
>

export default function AccountingService({
	schemaType = "AccountingService",
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
