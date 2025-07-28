import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import MensClothingStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/MensClothingStore/index.tsx"

export interface MensClothingStoreProps {
}

type MensClothingStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& MensClothingStoreProps

export default MensClothingStore
