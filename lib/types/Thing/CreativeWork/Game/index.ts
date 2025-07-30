import type { URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Place from "../../Place/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import ThingComponent from "../../../../components/Thing/index.ts"
import PostalAddressComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export interface GameProps {
	"@type"?: "Game"
	characterAttribute?: Thing | ReturnType<typeof ThingComponent>
	gameItem?: Thing | ReturnType<typeof ThingComponent>
	gameLocation?:
		| Place
		| PostalAddress
		| URL
		| ReturnType<typeof PlaceComponent>
		| ReturnType<typeof PostalAddressComponent>
	numberOfPlayers?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	quest?: Thing | ReturnType<typeof ThingComponent>
}

type Game = Thing & CreativeWorkProps & GameProps

export default Game
