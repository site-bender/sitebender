import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import ParkComponent from "../../../../../../components/Thing/Place/CivicStructure/Park/index.tsx"

export interface ParkProps {
}

type Park =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& ParkProps

export default Park
