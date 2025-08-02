import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { PostOfficeType } from "./PostOffice/index.ts"

export type GovernmentOfficeType = "GovernmentOffice" | PostOfficeType

export interface GovernmentOfficeProps {
	"@type"?: GovernmentOfficeType
}

type GovernmentOffice =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& GovernmentOfficeProps

export default GovernmentOffice
