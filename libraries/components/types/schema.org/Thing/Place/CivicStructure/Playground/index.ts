import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type PlaygroundType = "Playground"

export interface PlaygroundProps {
	"@type"?: PlaygroundType
}

type Playground = Thing & PlaceProps & CivicStructureProps & PlaygroundProps

export default Playground
