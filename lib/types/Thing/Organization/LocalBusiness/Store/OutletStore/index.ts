import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import OutletStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/OutletStore/index.tsx"

export interface OutletStoreProps {
}

type OutletStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& OutletStoreProps

export default OutletStore
