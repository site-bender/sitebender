import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

export type ContinentType = "Continent"

export interface ContinentProps {
	"@type"?: ContinentType
}

type Continent = Thing & PlaceProps & LandformProps & ContinentProps

export default Continent
