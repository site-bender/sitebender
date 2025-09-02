import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { AutoBodyShopType } from "./AutoBodyShop/index.ts"
import type { AutoDealerType } from "./AutoDealer/index.ts"
import type { AutoPartsStoreType } from "./AutoPartsStore/index.ts"
import type { AutoRentalType } from "./AutoRental/index.ts"
import type { AutoRepairType } from "./AutoRepair/index.ts"
import type { AutoWashType } from "./AutoWash/index.ts"
import type { GasStationType } from "./GasStation/index.ts"
import type { MotorcycleDealerType } from "./MotorcycleDealer/index.ts"
import type { MotorcycleRepairType } from "./MotorcycleRepair/index.ts"

export type AutomotiveBusinessType =
	| "AutomotiveBusiness"
	| AutoDealerType
	| GasStationType
	| AutoBodyShopType
	| AutoPartsStoreType
	| AutoRentalType
	| MotorcycleRepairType
	| AutoWashType
	| AutoRepairType
	| MotorcycleDealerType

export interface AutomotiveBusinessProps {
	"@type"?: AutomotiveBusinessType
}

type AutomotiveBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& AutomotiveBusinessProps

export default AutomotiveBusiness
