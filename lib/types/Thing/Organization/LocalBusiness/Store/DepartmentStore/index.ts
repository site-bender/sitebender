import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import DepartmentStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/DepartmentStore/index.tsx"

export interface DepartmentStoreProps {
}

type DepartmentStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& DepartmentStoreProps

export default DepartmentStore
