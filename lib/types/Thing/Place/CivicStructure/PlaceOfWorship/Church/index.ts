import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { PlaceOfWorshipProps } from "../index.ts"

import ChurchComponent from "../../../../../../../components/Thing/Place/CivicStructure/PlaceOfWorship/Church/index.tsx"

export interface ChurchProps {
}

type Church =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaceOfWorshipProps
	& ChurchProps

export default Church
