import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type HardwareStoreType = "HardwareStore"

export interface HardwareStoreProps {
	"@type"?: HardwareStoreType
}

type HardwareStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& HardwareStoreProps

export default HardwareStore
