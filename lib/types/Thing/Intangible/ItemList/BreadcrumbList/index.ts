import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ItemListProps } from "../index.ts"

import BreadcrumbListComponent from "../../../../../../components/Thing/Intangible/ItemList/BreadcrumbList/index.tsx"

export interface BreadcrumbListProps {
}

type BreadcrumbList =
	& Thing
	& IntangibleProps
	& ItemListProps
	& BreadcrumbListProps

export default BreadcrumbList
