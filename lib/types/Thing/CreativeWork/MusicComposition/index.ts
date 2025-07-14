import { Text } from "../../../DataType/index.ts"
import Event from "../../Event/index.ts"
import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import CreativeWork from "../index.ts"
import MusicRecording from "../MusicRecording/index.ts"

export default interface MusicComposition extends CreativeWork {
	/** The person or organization who wrote a composition, or who is the composer of a work performed at some event. */
	composer?: Organization | Person
	/** The date and place the work was first performed. */
	firstPerformance?: Event
	/** Smaller compositions included in this work (e.g. a movement in a symphony). */
	includedComposition?: MusicComposition
	/** The International Standard Musical Work Code for the composition. */
	iswcCode?: Text
	/** The person who wrote the words. */
	lyricist?: Person
	/** The words in the song. */
	lyrics?: CreativeWork
	/** An arrangement derived from the composition. */
	musicArrangement?: MusicComposition
	/** The type of composition (e.g. overture, sonata, symphony, etc.). */
	musicCompositionForm?: Text
	/** The key, mode, or scale this composition uses. */
	musicalKey?: Text
	/** An audio recording of the work. */
	recordedAs?: MusicRecording
}
