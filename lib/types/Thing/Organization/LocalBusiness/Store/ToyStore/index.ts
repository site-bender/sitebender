import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import ToyStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/ToyStore/index.tsx"

export interface ToyStoreProps {
}

type ToyStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& ToyStoreProps

export default ToyStore
