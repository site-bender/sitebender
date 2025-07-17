import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutomatedTellerProps from "../../../../../../types/Thing/AutomatedTeller/index.ts"
import type FinancialServiceProps from "../../../../../../types/Thing/FinancialService/index.ts"

import FinancialService from "../index.tsx"

// AutomatedTeller adds no properties to the FinancialService schema type
export type Props = BaseComponentProps<
	AutomatedTellerProps,
	"AutomatedTeller",
	ExtractLevelProps<AutomatedTellerProps, FinancialServiceProps>
>

export default function AutomatedTeller({
	schemaType = "AutomatedTeller",
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
