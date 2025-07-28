import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import GroceryStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/GroceryStore/index.tsx"

export interface GroceryStoreProps {
}

type GroceryStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& GroceryStoreProps

export default GroceryStore
