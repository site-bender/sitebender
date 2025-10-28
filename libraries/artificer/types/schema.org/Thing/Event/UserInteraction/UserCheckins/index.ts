import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export type UserCheckinsType = "UserCheckins"

export interface UserCheckinsProps {
	"@type"?: UserCheckinsType
}

type UserCheckins =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserCheckinsProps

export default UserCheckins
