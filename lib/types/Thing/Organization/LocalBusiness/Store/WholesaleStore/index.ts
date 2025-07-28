import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import WholesaleStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/WholesaleStore/index.tsx"

export interface WholesaleStoreProps {
}

type WholesaleStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& WholesaleStoreProps

export default WholesaleStore
