import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export interface UserCheckinsProps {
}

type UserCheckins =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserCheckinsProps

export default UserCheckins
