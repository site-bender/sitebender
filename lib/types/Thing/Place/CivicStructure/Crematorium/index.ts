import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import CrematoriumComponent from "../../../../../../components/Thing/Place/CivicStructure/Crematorium/index.tsx"

export interface CrematoriumProps {
}

type Crematorium =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& CrematoriumProps

export default Crematorium
