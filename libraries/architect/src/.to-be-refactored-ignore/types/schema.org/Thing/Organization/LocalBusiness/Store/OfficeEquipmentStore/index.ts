import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type OfficeEquipmentStoreType = "OfficeEquipmentStore"

export interface OfficeEquipmentStoreProps {
	"@type"?: OfficeEquipmentStoreType
}

type OfficeEquipmentStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& OfficeEquipmentStoreProps

export default OfficeEquipmentStore
