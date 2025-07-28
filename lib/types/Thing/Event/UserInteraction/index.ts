import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface UserInteractionProps {}

type UserInteraction = Thing & EventProps & UserInteractionProps

export default UserInteraction
