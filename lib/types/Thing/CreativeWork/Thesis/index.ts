import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ThesisProps {
	inSupportOf?: Text
}

type Thesis =
	& Thing
	& CreativeWorkProps
	& ThesisProps

export default Thesis
