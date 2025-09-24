import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type DrawingType = "Drawing"

export interface DrawingProps {
	"@type"?: DrawingType
}

type Drawing = Thing & CreativeWorkProps & DrawingProps

export default Drawing
