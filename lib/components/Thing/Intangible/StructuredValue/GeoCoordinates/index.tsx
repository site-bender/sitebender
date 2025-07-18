import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type GeoCoordinatesProps from "../../../../../types/Thing/GeoCoordinates/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	GeoCoordinatesProps,
	"GeoCoordinates",
	ExtractLevelProps<GeoCoordinatesProps, StructuredValueProps>
>

export default function GeoCoordinates(
	{
		address,
		addressCountry,
		elevation,
		latitude,
		longitude,
		postalCode,
		schemaType = "GeoCoordinates",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
