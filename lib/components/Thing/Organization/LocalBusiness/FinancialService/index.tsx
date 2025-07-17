import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FinancialServiceProps from "../../../../../types/Thing/FinancialService/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = BaseComponentProps<
	FinancialServiceProps,
	"FinancialService",
	ExtractLevelProps<FinancialServiceProps, LocalBusinessProps>
>

export default function FinancialService(
	{
		feesAndCommissionsSpecification,
		schemaType = "FinancialService",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				feesAndCommissionsSpecification,
				...subtypeProperties,
			}}
		/>
	)
}
