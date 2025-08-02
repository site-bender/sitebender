import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Distance from "../../Intangible/Quantity/Distance/index.ts"
import type Mass from "../../Intangible/Quantity/Mass/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { CoverArtType } from "./CoverArt/index.ts"

import DistanceComponent from "../../../../components/Thing/Intangible/Quantity/Distance/index.ts"
import MassComponent from "../../../../components/Thing/Intangible/Quantity/Mass/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export type VisualArtworkType = "VisualArtwork" | CoverArtType

export interface VisualArtworkProps {
	"@type"?: VisualArtworkType
	artEdition?: Integer | Text
	artform?: Text | URL
	artist?: Person | ReturnType<typeof PersonComponent>
	artMedium?: Text | URL
	artworkSurface?: Text | URL
	colorist?: Person | ReturnType<typeof PersonComponent>
	depth?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	height?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	inker?: Person | ReturnType<typeof PersonComponent>
	letterer?: Person | ReturnType<typeof PersonComponent>
	penciler?: Person | ReturnType<typeof PersonComponent>
	surface?: Text | URL
	weight?:
		| Mass
		| QuantitativeValue
		| ReturnType<typeof MassComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	width?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
}

type VisualArtwork = Thing & CreativeWorkProps & VisualArtworkProps

export default VisualArtwork
