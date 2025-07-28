import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import AquariumComponent from "../../../../../../components/Thing/Place/CivicStructure/Aquarium/index.tsx"

export interface AquariumProps {
}

type Aquarium =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& AquariumProps

export default Aquarium
