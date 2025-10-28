import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type SculptureType = "Sculpture"

export interface SculptureProps {
	"@type"?: SculptureType
}

type Sculpture = Thing & CreativeWorkProps & SculptureProps

export default Sculpture
