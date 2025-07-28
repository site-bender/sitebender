import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type CreativeWork from "../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

import ClaimComponent from "../../../../../components/Thing/CreativeWork/Claim/index.tsx"

export interface ClaimProps {
	appearance?: CreativeWork
	claimInterpreter?: Organization | Person
	firstAppearance?: CreativeWork
}

type Claim =
	& Thing
	& CreativeWorkProps
	& ClaimProps

export default Claim
