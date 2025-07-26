import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

export interface ContinentProps {
}

type Continent =
	& Thing
	& PlaceProps
	& LandformProps
	& ContinentProps

export default Continent
