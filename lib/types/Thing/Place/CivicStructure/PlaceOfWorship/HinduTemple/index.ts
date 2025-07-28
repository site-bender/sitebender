import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

import HinduTempleComponent from "../../../../../../../components/Thing/Place/CivicStructure/PlaceOfWorship/HinduTemple/index.tsx"

export interface HinduTempleProps {
}

type HinduTemple =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& HinduTempleProps

export default HinduTemple
