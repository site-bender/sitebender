import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

export type BookmarkActionType = "BookmarkAction"

export interface BookmarkActionProps {
	"@type"?: BookmarkActionType
}

type BookmarkAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& BookmarkActionProps

export default BookmarkAction
