import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import AtlasComponent from "../../../../../components/Thing/CreativeWork/Atlas/index.tsx"

export interface AtlasProps {
}

type Atlas =
	& Thing
	& CreativeWorkProps
	& AtlasProps

export default Atlas
