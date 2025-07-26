import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface PlayProps {
}

type Play =
	& Thing
	& CreativeWorkProps
	& PlayProps

export default Play
