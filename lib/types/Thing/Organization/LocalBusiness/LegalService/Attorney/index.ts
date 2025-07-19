// Attorney extends LegalService but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { LegalServiceProps } from "../../../../Place/LocalBusiness/LegalService/index.ts"

// deno-lint-ignore no-empty-interface
export interface AttorneyProps {}

type Attorney =
	& Thing
	& LegalServiceProps
	& LocalBusinessProps
	& PlaceProps
	& AttorneyProps

export default Attorney
