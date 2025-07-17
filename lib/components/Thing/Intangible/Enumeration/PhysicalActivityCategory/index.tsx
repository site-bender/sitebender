import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type PhysicalActivityCategoryProps from "../../../../../types/Thing/PhysicalActivityCategory/index.ts"

import Enumeration from "../index.tsx"

// PhysicalActivityCategory adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	PhysicalActivityCategoryProps,
	"PhysicalActivityCategory",
	ExtractLevelProps<PhysicalActivityCategoryProps, EnumerationProps>
>

export default function PhysicalActivityCategory({
	schemaType = "PhysicalActivityCategory",
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
