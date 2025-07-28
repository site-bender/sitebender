import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import DrawingComponent from "../../../../../components/Thing/CreativeWork/Drawing/index.tsx"

export interface DrawingProps {
}

type Drawing =
	& Thing
	& CreativeWorkProps
	& DrawingProps

export default Drawing
