import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface GovernmentOfficeProps {
	"@type"?: "GovernmentOffice"}

type GovernmentOffice =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& GovernmentOfficeProps

export default GovernmentOffice
