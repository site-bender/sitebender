import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type ElectronicsStoreType = "ElectronicsStore"

export interface ElectronicsStoreProps {
	"@type"?: ElectronicsStoreType
}

type ElectronicsStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& ElectronicsStoreProps

export default ElectronicsStore
