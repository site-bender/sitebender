import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { OnlineBusinessProps } from "../index.ts"

export interface OnlineStoreProps {
	"@type"?: "OnlineStore"}

type OnlineStore =
	& Thing
	& OrganizationProps
	& OnlineBusinessProps
	& OnlineStoreProps

export default OnlineStore
