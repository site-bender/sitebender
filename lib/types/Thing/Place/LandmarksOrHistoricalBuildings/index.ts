import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

import LandmarksOrHistoricalBuildingsComponent from "../../../../../components/Thing/Place/LandmarksOrHistoricalBuildings/index.tsx"

export interface LandmarksOrHistoricalBuildingsProps {
}

type LandmarksOrHistoricalBuildings =
	& Thing
	& PlaceProps
	& LandmarksOrHistoricalBuildingsProps

export default LandmarksOrHistoricalBuildings
