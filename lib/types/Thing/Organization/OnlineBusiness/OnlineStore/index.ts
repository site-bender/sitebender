// OnlineStore extends OnlineBusiness but adds no additional properties
import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { OnlineBusinessProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface OnlineStoreProps {}

type OnlineStore =
	& Thing
	& OnlineBusinessProps
	& OrganizationProps
	& OnlineStoreProps

export default OnlineStore
