import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import BeachComponent from "../../../../../../components/Thing/Place/CivicStructure/Beach/index.tsx"

export interface BeachProps {
}

type Beach =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& BeachProps

export default Beach
