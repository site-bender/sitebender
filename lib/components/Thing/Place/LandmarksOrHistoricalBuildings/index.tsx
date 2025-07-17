import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type LandmarksOrHistoricalBuildingsProps from "../../../../types/Thing/LandmarksOrHistoricalBuildings/index.ts"
import type PlaceProps from "../../../../types/Thing/Place/index.ts"

import Place from "../index.tsx"

// LandmarksOrHistoricalBuildings adds no properties to the Place schema type
export type Props = BaseComponentProps<
	LandmarksOrHistoricalBuildingsProps,
	"LandmarksOrHistoricalBuildings",
	ExtractLevelProps<LandmarksOrHistoricalBuildingsProps, PlaceProps>
>

export default function LandmarksOrHistoricalBuildings({
	schemaType = "LandmarksOrHistoricalBuildings",
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
