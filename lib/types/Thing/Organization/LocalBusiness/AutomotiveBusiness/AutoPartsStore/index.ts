import type Thing from "../../../../index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../../Store/index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"

import AutoPartsStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoPartsStore/index.tsx"

export interface AutoPartsStoreProps {
}

type AutoPartsStore =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& StoreProps
	& PlaceProps
	& AutomotiveBusinessProps
	& AutoPartsStoreProps

export default AutoPartsStore
