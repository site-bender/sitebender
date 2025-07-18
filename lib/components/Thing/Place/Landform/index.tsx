import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type LandformProps from "../../../../types/Thing/Landform/index.ts"
import type PlaceProps from "../../../../types/Thing/Place/index.ts"

import Place from "../index.tsx"

// Landform adds no properties to the Place schema type
export type Props = BaseComponentProps<
	LandformProps,
	"Landform",
	ExtractLevelProps<LandformProps, PlaceProps>
>

export default function Landform({
	schemaType = "Landform",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Place
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
