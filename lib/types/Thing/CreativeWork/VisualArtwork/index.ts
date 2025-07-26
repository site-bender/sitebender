import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Distance from "../../Intangible/Quantity/Distance/index.ts"
import type Mass from "../../Intangible/Quantity/Mass/index.ts"
import type Person from "../../Person/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface VisualArtworkProps {
	artEdition?: Integer | Text
	artform?: Text | URL
	artist?: Person
	artMedium?: Text | URL
	artworkSurface?: Text | URL
	colorist?: Person
	depth?: Distance | QuantitativeValue
	height?: Distance | QuantitativeValue
	inker?: Person
	letterer?: Person
	penciler?: Person
	surface?: Text | URL
	weight?: Mass | QuantitativeValue
	width?: Distance | QuantitativeValue
}

type VisualArtwork =
	& Thing
	& CreativeWorkProps
	& VisualArtworkProps

export default VisualArtwork
