import type { URL } from "../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Thing from "../../index.ts"
import type PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Place from "../../Place/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface GameProps {
	/** A piece of data that represents a particular aspect of a fictional character (skill, power, character points, advantage, disadvantage). */
	characterAttribute?: Thing
	/** An item is an object within the game world that can be collected by a player or, occasionally, a non-player character. */
	gameItem?: Thing
	/** Real or fictional location of the game (or part of game). */
	gameLocation?: URL | Place | PostalAddress
	/** Indicate how many people can play this game (minimum, maximum, or range). */
	numberOfPlayers?: QuantitativeValue
	/** The task that a player-controlled character, or group of characters may complete in order to gain a reward. */
	quest?: Thing
}

type Game =
	& Thing
	& CreativeWorkProps
	& GameProps

export default Game
