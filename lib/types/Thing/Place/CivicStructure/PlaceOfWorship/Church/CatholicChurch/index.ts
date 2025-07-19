// CatholicChurch extends Church but adds no additional properties
import type Thing from "../../../../../index.ts"
import type { PlaceProps } from "../../../../index.ts"
import type { CivicStructureProps } from "../../../index.ts"
import type { PlaceOfWorshipProps } from "../../index.ts"
import type { ChurchProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CatholicChurchProps {}

type CatholicChurch =
	& Thing
	& ChurchProps
	& CivicStructureProps
	& PlaceProps
	& PlaceOfWorshipProps
	& CatholicChurchProps

export default CatholicChurch
