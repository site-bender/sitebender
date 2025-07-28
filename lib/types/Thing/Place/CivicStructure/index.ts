import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

import CivicStructureComponent from "../../../../../components/Thing/Place/CivicStructure/index.tsx"

export interface CivicStructureProps {
	openingHours?: Text
}

type CivicStructure =
	& Thing
	& PlaceProps
	& CivicStructureProps

export default CivicStructure
