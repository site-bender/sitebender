import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface SculptureProps {
	"@type"?: "Sculpture"}

type Sculpture = Thing & CreativeWorkProps & SculptureProps

export default Sculpture
