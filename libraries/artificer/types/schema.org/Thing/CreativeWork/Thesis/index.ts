import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type ThesisType = "Thesis"

export interface ThesisProps {
	"@type"?: ThesisType
	inSupportOf?: Text
}

type Thesis = Thing & CreativeWorkProps & ThesisProps

export default Thesis
