import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type AquariumType = "Aquarium"

export interface AquariumProps {
	"@type"?: AquariumType
}

type Aquarium = Thing & PlaceProps & CivicStructureProps & AquariumProps

export default Aquarium
