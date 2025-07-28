import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import ComputerStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/ComputerStore/index.tsx"

export interface ComputerStoreProps {
}

type ComputerStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& ComputerStoreProps

export default ComputerStore
