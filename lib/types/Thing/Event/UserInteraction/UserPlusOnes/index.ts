import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export interface UserPlusOnesProps {
	"@type"?: "UserPlusOnes"}

type UserPlusOnes =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserPlusOnesProps

export default UserPlusOnes
