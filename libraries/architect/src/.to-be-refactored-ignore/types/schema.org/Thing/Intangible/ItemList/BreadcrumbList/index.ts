import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ItemListProps } from "../index.ts"

export type BreadcrumbListType = "BreadcrumbList"

export interface BreadcrumbListProps {
	"@type"?: BreadcrumbListType
}

type BreadcrumbList =
	& Thing
	& IntangibleProps
	& ItemListProps
	& BreadcrumbListProps

export default BreadcrumbList
