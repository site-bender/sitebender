import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

import LandformComponent from "../../../../../components/Thing/Place/Landform/index.tsx"

export interface LandformProps {
}

type Landform =
	& Thing
	& PlaceProps
	& LandformProps

export default Landform
