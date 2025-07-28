import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import ShoeStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/ShoeStore/index.tsx"

export interface ShoeStoreProps {
}

type ShoeStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& ShoeStoreProps

export default ShoeStore
