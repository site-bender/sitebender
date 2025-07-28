import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

import VolcanoComponent from "../../../../../../components/Thing/Place/Landform/Volcano/index.tsx"

export interface VolcanoProps {
}

type Volcano =
	& Thing
	& PlaceProps
	& LandformProps
	& VolcanoProps

export default Volcano
