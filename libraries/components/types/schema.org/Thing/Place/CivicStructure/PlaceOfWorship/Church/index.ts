import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"
import type { CatholicChurchType } from "./CatholicChurch/index.ts"

export type ChurchType = "Church" | CatholicChurchType

export interface ChurchProps {
	"@type"?: ChurchType
}

type Church =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& ChurchProps

export default Church
