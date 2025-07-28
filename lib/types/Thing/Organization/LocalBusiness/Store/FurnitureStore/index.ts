import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import FurnitureStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/FurnitureStore/index.tsx"

export interface FurnitureStoreProps {
}

type FurnitureStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& FurnitureStoreProps

export default FurnitureStore
