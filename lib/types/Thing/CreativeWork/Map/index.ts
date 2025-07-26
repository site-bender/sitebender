import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MapCategoryType from "../../Intangible/Enumeration/MapCategoryType/index.ts"

export interface MapProps {
	mapType?: MapCategoryType
}

type Map =
	& Thing
	& CreativeWorkProps
	& MapProps

export default Map
