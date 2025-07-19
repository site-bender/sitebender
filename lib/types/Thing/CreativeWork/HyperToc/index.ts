import type Thing from "../../index.ts"
import type HyperTocEntry from "../HyperTocEntry/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MediaObject from "../MediaObject/index.ts"

export interface HyperTocProps {
	/** A media object that encodes this CreativeWork. This property is a synonym for encoding. */
	associatedMedia?: MediaObject
	/** Indicates a [[HyperTocEntry]] in a [[HyperToc]]. */
	tocEntry?: HyperTocEntry
}

type HyperToc =
	& Thing
	& CreativeWorkProps
	& HyperTocProps

export default HyperToc
