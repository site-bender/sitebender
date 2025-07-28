import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import RVParkComponent from "../../../../../../components/Thing/Place/CivicStructure/RVPark/index.tsx"

export interface RVParkProps {
}

type RVPark =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& RVParkProps

export default RVPark
