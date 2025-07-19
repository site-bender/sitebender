// BookmarkAction extends OrganizeAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface BookmarkActionProps {}

type BookmarkAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& BookmarkActionProps

export default BookmarkAction
