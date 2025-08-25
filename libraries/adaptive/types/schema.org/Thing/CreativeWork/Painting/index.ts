import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type PaintingType = "Painting"

export interface PaintingProps {
	"@type"?: PaintingType
}

type Painting = Thing & CreativeWorkProps & PaintingProps

export default Painting
