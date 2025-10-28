import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type MobilePhoneStoreType = "MobilePhoneStore"

export interface MobilePhoneStoreProps {
	"@type"?: MobilePhoneStoreType
}

type MobilePhoneStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& MobilePhoneStoreProps

export default MobilePhoneStore
