import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface PaintingProps {
	"@type"?: "Painting"}

type Painting = Thing & CreativeWorkProps & PaintingProps

export default Painting
