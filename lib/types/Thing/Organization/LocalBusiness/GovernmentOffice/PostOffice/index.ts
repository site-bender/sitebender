// PostOffice extends GovernmentOffice but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { GovernmentOfficeProps } from "../../../../Place/LocalBusiness/GovernmentOffice/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface PostOfficeProps {}

type PostOffice =
	& Thing
	& GovernmentOfficeProps
	& LocalBusinessProps
	& PlaceProps
	& PostOfficeProps

export default PostOffice
