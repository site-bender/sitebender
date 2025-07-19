// Church extends PlaceOfWorship but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ChurchProps {}

type Church =
	& Thing
	& CivicStructureProps
	& PlaceProps
	& PlaceOfWorshipProps
	& ChurchProps

export default Church
