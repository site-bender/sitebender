import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type IncentiveQualifiedExpenseTypeProps from "../../../../../types/Thing/IncentiveQualifiedExpenseType/index.ts"

import Enumeration from "./index.tsx"

// IncentiveQualifiedExpenseType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	IncentiveQualifiedExpenseTypeProps,
	"IncentiveQualifiedExpenseType",
	ExtractLevelProps<IncentiveQualifiedExpenseTypeProps, EnumerationProps>
>

export default function IncentiveQualifiedExpenseType({
	schemaType = "IncentiveQualifiedExpenseType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
