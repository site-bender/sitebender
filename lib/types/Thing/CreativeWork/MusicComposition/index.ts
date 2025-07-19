import type { Text } from "../../../DataType/index.ts"
import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MusicRecording from "../MusicRecording/index.ts"

export interface MusicCompositionProps {
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

type MusicComposition =
	& Thing
	& CreativeWorkProps
	& MusicCompositionProps

export default MusicComposition
