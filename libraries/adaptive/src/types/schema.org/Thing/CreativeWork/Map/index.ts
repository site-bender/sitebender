import type Thing from "../../index.ts"
import type MapCategoryType from "../../Intangible/Enumeration/MapCategoryType/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import { MapCategoryType as MapCategoryTypeComponent } from "../../../../../components/index.tsx"

export type MapType = "Map"

export interface MapProps {
	"@type"?: MapType
	mapType?: MapCategoryType | ReturnType<typeof MapCategoryTypeComponent>
}

type Map = Thing & CreativeWorkProps & MapProps

export default Map
