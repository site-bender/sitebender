import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

import SynagogueComponent from "../../../../../../../components/Thing/Place/CivicStructure/PlaceOfWorship/Synagogue/index.tsx"

export interface SynagogueProps {
}

type Synagogue =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& SynagogueProps

export default Synagogue
