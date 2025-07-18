import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FinancialServiceProps from "../../../../../../types/Thing/FinancialService/index.ts"
import type InsuranceAgencyProps from "../../../../../../types/Thing/InsuranceAgency/index.ts"

import FinancialService from "../index.tsx"

// InsuranceAgency adds no properties to the FinancialService schema type
export type Props = BaseComponentProps<
	InsuranceAgencyProps,
	"InsuranceAgency",
	ExtractLevelProps<InsuranceAgencyProps, FinancialServiceProps>
>

export default function InsuranceAgency({
	schemaType = "InsuranceAgency",
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
