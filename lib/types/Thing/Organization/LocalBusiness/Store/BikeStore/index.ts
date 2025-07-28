import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import BikeStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/BikeStore/index.tsx"

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
