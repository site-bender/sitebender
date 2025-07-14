import { URL } from "../../../DataType/index.ts"
import Thing from "../../../index.ts"
import PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import Place from "../../Place/index.ts"
import CreativeWork from "../index.ts"

export default interface Game extends CreativeWork {
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
