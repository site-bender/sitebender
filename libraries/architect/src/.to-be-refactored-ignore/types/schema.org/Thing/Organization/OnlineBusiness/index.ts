import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"
import type { OnlineStoreType } from "./OnlineStore/index.ts"

export type OnlineBusinessType = "OnlineBusiness" | OnlineStoreType

export interface OnlineBusinessProps {
	"@type"?: OnlineBusinessType
}

type OnlineBusiness = Thing & OrganizationProps & OnlineBusinessProps

export default OnlineBusiness
