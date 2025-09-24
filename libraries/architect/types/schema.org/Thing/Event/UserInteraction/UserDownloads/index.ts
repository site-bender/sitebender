import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export type UserDownloadsType = "UserDownloads"

export interface UserDownloadsProps {
	"@type"?: UserDownloadsType
}

type UserDownloads =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserDownloadsProps

export default UserDownloads
