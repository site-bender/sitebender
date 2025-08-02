import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type PhotographType = "Photograph"

export interface PhotographProps {
	"@type"?: PhotographType
}

type Photograph = Thing & CreativeWorkProps & PhotographProps

export default Photograph
