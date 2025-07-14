import Organization from "../../Organization/index.ts"
import Person from "../../Person/index.ts"
import CreativeWork from "../index.ts"

export default interface Claim extends CreativeWork {
	/** Indicates an occurrence of a [[Claim]] in some [[CreativeWork]]. */
	appearance?: CreativeWork
	/** For a [[Claim]] interpreted from [[MediaObject]] content, the [[interpretedAsClaim]] property can be used to indicate a claim contained, implied or refined from the content of a [[MediaObject]]. */
	claimInterpreter?: Organization | Person
	/** Indicates the first known occurrence of a [[Claim]] in some [[CreativeWork]]. */
	firstAppearance?: CreativeWork
}
