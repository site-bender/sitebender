import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface MapCategoryTypeProps {}

type MapCategoryType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MapCategoryTypeProps

export default MapCategoryType
