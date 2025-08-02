import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type ManuscriptType = "Manuscript"

export interface ManuscriptProps {
	"@type"?: ManuscriptType
}

type Manuscript = Thing & CreativeWorkProps & ManuscriptProps

export default Manuscript
