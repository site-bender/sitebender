import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

import MosqueComponent from "../../../../../../../components/Thing/Place/CivicStructure/PlaceOfWorship/Mosque/index.tsx"

export interface MosqueProps {
}

type Mosque =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& MosqueProps

export default Mosque
