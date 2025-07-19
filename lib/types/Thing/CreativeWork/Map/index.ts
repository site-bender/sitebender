import type Thing from "../../index.ts"
import type MapCategoryType from "../../Intangible/Enumeration/MapCategoryType/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface MapProps {
	/** Indicates the kind of Map, from the MapCategoryType Enumeration. */
	mapType?: MapCategoryType
}

type Map =
	& Thing
	& CreativeWorkProps
	& MapProps

export default Map
