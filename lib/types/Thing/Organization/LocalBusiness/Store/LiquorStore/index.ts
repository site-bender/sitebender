import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import LiquorStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/LiquorStore/index.tsx"

export interface LiquorStoreProps {
}

type LiquorStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& LiquorStoreProps

export default LiquorStore
