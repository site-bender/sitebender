import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../../types/Thing/Organization/index.ts"
import type { LocalBusinessProps } from "../../../../../types/Thing/Organization/LocalBusiness/index.ts"
import type { FinancialServiceProps } from "../../../../../types/Thing/Organization/LocalBusiness/FinancialService/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = BaseComponentProps<
	FinancialServiceProps,
	"FinancialService",
	ExtractLevelProps<ThingProps, OrganizationProps, LocalBusinessProps>
>

export default function FinancialService({
	feesAndCommissionsSpecification,
	schemaType = "FinancialService",
	subtypeProperties = {},
	...props
}): Props {
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
