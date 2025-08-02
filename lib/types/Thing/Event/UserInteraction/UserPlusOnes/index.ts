import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export type UserPlusOnesType = "UserPlusOnes"

export interface UserPlusOnesProps {
	"@type"?: UserPlusOnesType
}

type UserPlusOnes =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserPlusOnesProps

export default UserPlusOnes
