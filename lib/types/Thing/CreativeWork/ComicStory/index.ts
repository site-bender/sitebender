import type Thing from "../../index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ComicStoryProps {
	/** The primary artist for a work     	in a medium other than pencils or digital line art--for example, if the     	primary artwork is done in watercolors or digital paints. */
	artist?: Person
	/** The individual who adds color to inked drawings. */
	colorist?: Person
	/** The individual who traces over the pencil drawings in ink after pencils are complete. */
	inker?: Person
	/** The individual who adds lettering, including speech balloons and sound effects, to artwork. */
	letterer?: Person
	/** The individual who draws the primary narrative artwork. */
	penciler?: Person
}

type ComicStory =
	& Thing
	& CreativeWorkProps
	& ComicStoryProps

export default ComicStory
