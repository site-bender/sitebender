import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import PlayComponent from "../../../../../components/Thing/CreativeWork/Play/index.tsx"

export interface PlayProps {
}

type Play =
	& Thing
	& CreativeWorkProps
	& PlayProps

export default Play
