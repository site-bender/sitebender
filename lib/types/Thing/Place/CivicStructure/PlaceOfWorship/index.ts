import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import PlaceOfWorshipComponent from "../../../../../../components/Thing/Place/CivicStructure/PlaceOfWorship/index.tsx"

export interface PlaceOfWorshipProps {
}

type PlaceOfWorship =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps

export default PlaceOfWorship
