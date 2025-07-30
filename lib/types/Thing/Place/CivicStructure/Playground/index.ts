import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface PlaygroundProps {
	"@type"?: "Playground"}

type Playground = Thing & PlaceProps & CivicStructureProps & PlaygroundProps

export default Playground
