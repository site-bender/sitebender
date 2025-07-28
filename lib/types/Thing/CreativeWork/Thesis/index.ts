import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import ThesisComponent from "../../../../../components/Thing/CreativeWork/Thesis/index.tsx"

export interface ThesisProps {
	inSupportOf?: Text
}

type Thesis =
	& Thing
	& CreativeWorkProps
	& ThesisProps

export default Thesis
