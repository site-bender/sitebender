import type Thing from "../../../../../index.ts"
import type { PlaceProps } from "../../../../index.ts"
import type { CivicStructureProps } from "../../../index.ts"
import type { PlaceOfWorshipProps } from "../../index.ts"
import type { ChurchProps } from "../index.ts"

export interface CatholicChurchProps {}

type CatholicChurch =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& ChurchProps
	& CatholicChurchProps

export default CatholicChurch
