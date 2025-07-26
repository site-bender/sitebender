import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

export interface BookmarkActionProps {
}

type BookmarkAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& BookmarkActionProps

export default BookmarkAction
