import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import PlaygroundComponent from "../../../../../../components/Thing/Place/CivicStructure/Playground/index.tsx"

export interface PlaygroundProps {
}

type Playground =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PlaygroundProps

export default Playground
