import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import HardwareStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/HardwareStore/index.tsx"

export interface HardwareStoreProps {
}

type HardwareStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& HardwareStoreProps

export default HardwareStore
