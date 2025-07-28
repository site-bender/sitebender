import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import ZooComponent from "../../../../../../components/Thing/Place/CivicStructure/Zoo/index.tsx"

export interface ZooProps {
}

type Zoo =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& ZooProps

export default Zoo
