import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import MobilePhoneStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/MobilePhoneStore/index.tsx"

export interface MobilePhoneStoreProps {
}

type MobilePhoneStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& MobilePhoneStoreProps

export default MobilePhoneStore
