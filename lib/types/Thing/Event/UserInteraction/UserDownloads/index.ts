import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

import UserDownloadsComponent from "../../../../../../components/Thing/Event/UserInteraction/UserDownloads/index.tsx"

export interface UserDownloadsProps {
}

type UserDownloads =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserDownloadsProps

export default UserDownloads
