import type MapCategoryType from "../../Intangible/Enumeration/MapCategoryType/index.ts"
import type CreativeWork from "../index.ts"

export default interface Map extends CreativeWork {
	/** Indicates the kind of Map, from the MapCategoryType Enumeration. */
	mapType?: MapCategoryType
}
