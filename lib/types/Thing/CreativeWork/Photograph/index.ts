import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import PhotographComponent from "../../../../../components/Thing/CreativeWork/Photograph/index.tsx"

export interface PhotographProps {
}

type Photograph =
	& Thing
	& CreativeWorkProps
	& PhotographProps

export default Photograph
