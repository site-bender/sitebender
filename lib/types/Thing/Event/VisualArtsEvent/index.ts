import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface VisualArtsEventProps {
	"@type"?: "VisualArtsEvent"}

type VisualArtsEvent = Thing & EventProps & VisualArtsEventProps

export default VisualArtsEvent
