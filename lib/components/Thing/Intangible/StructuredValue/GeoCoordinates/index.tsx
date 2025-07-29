import type BaseProps from "../../../../../types/index.ts"
import type GeoCoordinatesProps from "../../../../../types/Thing/Intangible/StructuredValue/GeoCoordinates/index.ts"

import StructuredValue from "../index.tsx"

export type Props = GeoCoordinatesProps & BaseProps

export default function GeoCoordinates({
	address,
	addressCountry,
	elevation,
	latitude,
	longitude,
	postalCode,
	_type = "GeoCoordinates",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				address,
				addressCountry,
				elevation,
				latitude,
				longitude,
				postalCode,
				...subtypeProperties,
			}}
		/>
	)
}
