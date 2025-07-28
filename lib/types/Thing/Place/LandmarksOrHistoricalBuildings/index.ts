import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

export interface LandmarksOrHistoricalBuildingsProps {}

type LandmarksOrHistoricalBuildings =
	& Thing
	& PlaceProps
	& LandmarksOrHistoricalBuildingsProps

export default LandmarksOrHistoricalBuildings
