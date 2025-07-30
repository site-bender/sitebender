import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface LiteraryEventProps {
	"@type"?: "LiteraryEvent"}

type LiteraryEvent = Thing & EventProps & LiteraryEventProps

export default LiteraryEvent
