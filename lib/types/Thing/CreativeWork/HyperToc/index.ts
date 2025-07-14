import HyperTocEntry from "../HyperTocEntry/index.ts"
import CreativeWork from "../index.ts"
import MediaObject from "../MediaObject/index.ts"

export default interface HyperToc extends CreativeWork {
	/** A media object that encodes this CreativeWork. This property is a synonym for encoding. */
	associatedMedia?: MediaObject
	/** Indicates a [[HyperTocEntry]] in a [[HyperToc]]. */
	tocEntry?: HyperTocEntry
}
