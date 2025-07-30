import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface AquariumProps {
	"@type"?: "Aquarium"}

type Aquarium = Thing & PlaceProps & CivicStructureProps & AquariumProps

export default Aquarium
