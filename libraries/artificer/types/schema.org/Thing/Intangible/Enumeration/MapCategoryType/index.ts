import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type MapCategoryTypeType = "MapCategoryType"

export interface MapCategoryTypeProps {
	"@type"?: MapCategoryTypeType
}

type MapCategoryType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MapCategoryTypeProps

export default MapCategoryType
