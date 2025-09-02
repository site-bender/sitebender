import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type DepartmentStoreType = "DepartmentStore"

export interface DepartmentStoreProps {
	"@type"?: DepartmentStoreType
}

type DepartmentStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& DepartmentStoreProps

export default DepartmentStore
