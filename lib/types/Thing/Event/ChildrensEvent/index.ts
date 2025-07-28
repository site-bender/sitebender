import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface ChildrensEventProps {}

type ChildrensEvent = Thing & EventProps & ChildrensEventProps

export default ChildrensEvent
