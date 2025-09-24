import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

export type LandmarksOrHistoricalBuildingsType =
	"LandmarksOrHistoricalBuildings"

export interface LandmarksOrHistoricalBuildingsProps {
	"@type"?: LandmarksOrHistoricalBuildingsType
}

type LandmarksOrHistoricalBuildings =
	& Thing
	& PlaceProps
	& LandmarksOrHistoricalBuildingsProps

export default LandmarksOrHistoricalBuildings
