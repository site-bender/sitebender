import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type CodeType = "Code"

export interface CodeProps {
	"@type"?: CodeType
}

type Code = Thing & CreativeWorkProps & CodeProps

export default Code
