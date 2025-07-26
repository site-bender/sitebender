import type { URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Place from "../../Place/index.ts"
import type PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface GameProps {
	characterAttribute?: Thing
	gameItem?: Thing
	gameLocation?: Place | PostalAddress | URL
	numberOfPlayers?: QuantitativeValue
	quest?: Thing
}

type Game =
	& Thing
	& CreativeWorkProps
	& GameProps

export default Game
