import type BaseProps from "../../../../../../types/index.ts"
import type LocationFeatureSpecificationProps from "../../../../../../types/Thing/Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"

import PropertyValue from "../index.tsx"

export type Props = LocationFeatureSpecificationProps & BaseProps

export default function LocationFeatureSpecification({
	hoursAvailable,
	validFrom,
	validThrough,
	_type = "LocationFeatureSpecification",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PropertyValue
			{...props}
			_type={_type}
			subtypeProperties={{
				hoursAvailable,
				validFrom,
				validThrough,
				...subtypeProperties,
			}}
		>{children}</PropertyValue>
	)
}
