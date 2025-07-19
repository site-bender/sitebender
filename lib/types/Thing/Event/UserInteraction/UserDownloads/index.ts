// UserDownloads extends UserInteraction but adds no additional properties
import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface UserDownloadsProps {}

type UserDownloads =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserDownloadsProps

export default UserDownloads
