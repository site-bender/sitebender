import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { GovernmentOfficeProps } from "../index.ts"

export interface PostOfficeProps {}

type PostOffice =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& GovernmentOfficeProps
	& OrganizationProps
	& PostOfficeProps

export default PostOffice
