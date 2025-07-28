import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface TheaterEventProps {}

type TheaterEvent = Thing & EventProps & TheaterEventProps

export default TheaterEvent
