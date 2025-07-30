import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface DrawingProps {
	"@type"?: "Drawing"}

type Drawing = Thing & CreativeWorkProps & DrawingProps

export default Drawing
