// VisualArtsEvent extends Event but adds no additional properties
import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface VisualArtsEventProps {}

type VisualArtsEvent =
	& Thing
	& EventProps
	& VisualArtsEventProps

export default VisualArtsEvent
