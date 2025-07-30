import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ItemListProps } from "../index.ts"

export interface BreadcrumbListProps {
	"@type"?: "BreadcrumbList"}

type BreadcrumbList =
	& Thing
	& IntangibleProps
	& ItemListProps
	& BreadcrumbListProps

export default BreadcrumbList
