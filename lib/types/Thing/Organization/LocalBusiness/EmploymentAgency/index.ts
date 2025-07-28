import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import EmploymentAgencyComponent from "../../../../../../components/Thing/Organization/LocalBusiness/EmploymentAgency/index.tsx"

export interface EmploymentAgencyProps {
}

type EmploymentAgency =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& EmploymentAgencyProps

export default EmploymentAgency
