import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { OnlineBusinessProps } from "../index.ts"

export type OnlineStoreType = "OnlineStore"

export interface OnlineStoreProps {
	"@type"?: OnlineStoreType
}

type OnlineStore =
	& Thing
	& OrganizationProps
	& OnlineBusinessProps
	& OnlineStoreProps

export default OnlineStore
