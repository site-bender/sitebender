import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type GeoShapeProps from "../../../../../types/Thing/GeoShape/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	GeoShapeProps,
	"GeoShape",
	ExtractLevelProps<GeoShapeProps, StructuredValueProps>
>

export default function GeoShape(
	{
		address,
		addressCountry,
		box,
		circle,
		elevation,
		line,
		polygon,
		postalCode,
		schemaType = "GeoShape",
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
				box,
				circle,
				elevation,
				line,
				polygon,
				postalCode,
				...subtypeProperties,
			}}
		/>
	)
}
