import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type LocationFeatureSpecificationProps from "../../../../../../types/Thing/LocationFeatureSpecification/index.ts"
import type PropertyValueProps from "../../../../../../types/Thing/PropertyValue/index.ts"

import PropertyValue from "../index.tsx"

export type Props = BaseComponentProps<
	LocationFeatureSpecificationProps,
	"LocationFeatureSpecification",
	ExtractLevelProps<LocationFeatureSpecificationProps, PropertyValueProps>
>

export default function LocationFeatureSpecification(
	{
		hoursAvailable,
		validFrom,
		validThrough,
		schemaType = "LocationFeatureSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
