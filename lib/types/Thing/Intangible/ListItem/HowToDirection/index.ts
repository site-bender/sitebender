import type { Text, URL } from "../../../../DataType/index.ts"
import type MediaObject from "../../../CreativeWork/MediaObject/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type HowToSupply from "../HowToItem/HowToSupply/index.ts"
import type HowToTool from "../HowToItem/HowToTool/index.ts"
import type { ListItemProps } from "../index.ts"

export interface HowToDirectionProps {
	/** A media object representing the circumstances after performing this direction. */
	afterMedia?: MediaObject | URL
	/** A media object representing the circumstances before performing this direction. */
	beforeMedia?: MediaObject | URL
	/** A media object representing the circumstances while performing this direction. */
	duringMedia?: URL | MediaObject
	/** The length of time it takes to perform instructions or a direction (not including time to prepare the supplies), in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	performTime?: Duration
	/** The length of time it takes to prepare the items to be used in instructions or a direction, in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	prepTime?: Duration
	/** A sub-property of instrument. A supply consumed when performing instructions or a direction. */
	supply?: HowToSupply | Text
	/** A sub property of instrument. An object used (but not consumed) when performing instructions or a direction. */
	tool?: HowToTool | Text
	/** The total time required to perform instructions or a direction (including time to prepare the supplies), in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	totalTime?: Duration
}

type HowToDirection =
	& Thing
	& IntangibleProps
	& ListItemProps
	& HowToDirectionProps

export default HowToDirection
