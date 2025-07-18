import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BusinessEntityTypeProps from "../../../../../types/Thing/BusinessEntityType/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "../index.tsx"

// BusinessEntityType adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	BusinessEntityTypeProps,
	"BusinessEntityType",
	ExtractLevelProps<BusinessEntityTypeProps, EnumerationProps>
>

export default function BusinessEntityType({
	schemaType = "BusinessEntityType",
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
