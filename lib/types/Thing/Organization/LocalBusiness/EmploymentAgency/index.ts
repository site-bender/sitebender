import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type EmploymentAgencyType = "EmploymentAgency"

export interface EmploymentAgencyProps {
	"@type"?: EmploymentAgencyType
}

type EmploymentAgency =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& EmploymentAgencyProps

export default EmploymentAgency
