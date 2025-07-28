import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export interface UserPageVisitsProps {}

type UserPageVisits =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserPageVisitsProps

export default UserPageVisits
