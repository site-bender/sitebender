import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { PropertyValueProps } from "../../../../../../types/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import type { LocationFeatureSpecificationProps } from "../../../../../../types/Thing/Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"

import PropertyValue from "../index.tsx"

export type Props = BaseComponentProps<
	LocationFeatureSpecificationProps,
	"LocationFeatureSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps, PropertyValueProps>
>

export default function LocationFeatureSpecification({
	hoursAvailable,
	validFrom,
	validThrough,
	schemaType = "LocationFeatureSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<PropertyValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hoursAvailable,
				validFrom,
				validThrough,
				...subtypeProperties,
			}}
		/>
	)
}
