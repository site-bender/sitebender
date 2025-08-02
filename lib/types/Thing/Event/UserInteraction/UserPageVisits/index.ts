import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export type UserPageVisitsType = "UserPageVisits"

export interface UserPageVisitsProps {
	"@type"?: UserPageVisitsType
}

type UserPageVisits =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserPageVisitsProps

export default UserPageVisits
