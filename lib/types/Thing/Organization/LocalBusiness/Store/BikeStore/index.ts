import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

export interface BikeStoreProps {
}

type BikeStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& BikeStoreProps

export default BikeStore
