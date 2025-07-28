import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import ElectronicsStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/ElectronicsStore/index.tsx"

export interface ElectronicsStoreProps {
}

type ElectronicsStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& ElectronicsStoreProps

export default ElectronicsStore
