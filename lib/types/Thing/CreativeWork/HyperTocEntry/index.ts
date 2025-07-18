import type { Text } from "../../../DataType/index.ts"
import type CreativeWork from "../index.ts"
import type MediaObject from "../MediaObject/index.ts"

export default interface HyperTocEntry extends CreativeWork {
	/** A media object that encodes this CreativeWork. This property is a synonym for encoding. */
	associatedMedia?: MediaObject
	/** A [[HyperTocEntry]] can have a [[tocContinuation]] indicated, which is another [[HyperTocEntry]] that would be the default next item to play or render. */
	tocContinuation?: HyperTocEntry
	/** Text of an utterances (spoken words, lyrics etc.) that occurs at a certain section of a media object, represented as a [[HyperTocEntry]]. */
	utterances?: Text
}
