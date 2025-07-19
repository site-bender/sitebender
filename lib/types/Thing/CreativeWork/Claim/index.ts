import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ClaimProps {
	/** Indicates an occurrence of a [[Claim]] in some [[CreativeWork]]. */
	appearance?: CreativeWork
	/** For a [[Claim]] interpreted from [[MediaObject]] content, the [[interpretedAsClaim]] property can be used to indicate a claim contained, implied or refined from the content of a [[MediaObject]]. */
	claimInterpreter?: Organization | Person
	/** Indicates the first known occurrence of a [[Claim]] in some [[CreativeWork]]. */
	firstAppearance?: CreativeWork
}

type Claim =
	& Thing
	& CreativeWorkProps
	& ClaimProps

export default Claim
