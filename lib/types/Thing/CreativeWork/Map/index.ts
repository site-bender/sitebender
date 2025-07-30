import type Thing from "../../index.ts"
import type MapCategoryType from "../../Intangible/Enumeration/MapCategoryType/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import MapCategoryTypeComponent from "../../../../components/Thing/Intangible/Enumeration/MapCategoryType/index.ts"

export interface MapProps {
	"@type"?: "Map"
	mapType?: MapCategoryType | ReturnType<typeof MapCategoryTypeComponent>
}

type Map = Thing & CreativeWorkProps & MapProps

export default Map
