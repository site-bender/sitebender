import type Thing from "../../../../../index.ts"
import type { PlaceProps } from "../../../../index.ts"
import type { CivicStructureProps } from "../../../index.ts"
import type { PlaceOfWorshipProps } from "../../index.ts"
import type { ChurchProps } from "../index.ts"

export type CatholicChurchType = "CatholicChurch"

export interface CatholicChurchProps {
	"@type"?: CatholicChurchType
}

type CatholicChurch =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& ChurchProps
	& CatholicChurchProps

export default CatholicChurch
