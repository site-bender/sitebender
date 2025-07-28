import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

import ContinentComponent from "../../../../../../components/Thing/Place/Landform/Continent/index.tsx"

export interface ContinentProps {
}

type Continent =
	& Thing
	& PlaceProps
	& LandformProps
	& ContinentProps

export default Continent
