import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface CodeProps {
}

type Code =
	& Thing
	& CreativeWorkProps
	& CodeProps

export default Code
