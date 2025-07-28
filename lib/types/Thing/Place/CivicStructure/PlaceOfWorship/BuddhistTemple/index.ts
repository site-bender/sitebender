import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

import BuddhistTempleComponent from "../../../../../../../components/Thing/Place/CivicStructure/PlaceOfWorship/BuddhistTemple/index.tsx"

export interface BuddhistTempleProps {
}

type BuddhistTemple =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& BuddhistTempleProps

export default BuddhistTemple
