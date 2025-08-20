import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

export type MosqueType = "Mosque"

export interface MosqueProps {
	"@type"?: MosqueType
}

type Mosque =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& MosqueProps

export default Mosque
