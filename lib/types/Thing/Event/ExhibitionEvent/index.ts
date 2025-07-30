import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface ExhibitionEventProps {
	"@type"?: "ExhibitionEvent"}

type ExhibitionEvent = Thing & EventProps & ExhibitionEventProps

export default ExhibitionEvent
