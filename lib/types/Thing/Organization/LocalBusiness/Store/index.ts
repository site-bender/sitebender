import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import StoreComponent from "../../../../../../components/Thing/Organization/LocalBusiness/Store/index.tsx"

export interface StoreProps {
}

type Store =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& StoreProps

export default Store
