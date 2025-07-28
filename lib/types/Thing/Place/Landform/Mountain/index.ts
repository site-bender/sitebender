import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { LandformProps } from "../index.ts"

import MountainComponent from "../../../../../../components/Thing/Place/Landform/Mountain/index.tsx"

export interface MountainProps {
}

type Mountain =
	& Thing
	& PlaceProps
	& LandformProps
	& MountainProps

export default Mountain
