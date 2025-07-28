import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import CodeComponent from "../../../../../components/Thing/CreativeWork/Code/index.tsx"

export interface CodeProps {
}

type Code =
	& Thing
	& CreativeWorkProps
	& CodeProps

export default Code
