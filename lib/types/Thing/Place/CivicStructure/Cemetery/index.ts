import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import CemeteryComponent from "../../../../../../components/Thing/Place/CivicStructure/Cemetery/index.tsx"

export interface CemeteryProps {
}

type Cemetery =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& CemeteryProps

export default Cemetery
