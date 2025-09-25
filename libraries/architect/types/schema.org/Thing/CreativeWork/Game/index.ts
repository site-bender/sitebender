import type { URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Place from "../../Place/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { VideoGameType } from "./VideoGame/index.ts"

import ThingComponent from "../../../../../../pagewright/src/define/Thing/index.tsx"
import PostalAddressComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.tsx"
import QuantitativeValueComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import PlaceComponent from "../../../../../../pagewright/src/define/Thing/Place/index.tsx"

export type GameType = "Game" | VideoGameType

export interface GameProps {
	"@type"?: GameType
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
