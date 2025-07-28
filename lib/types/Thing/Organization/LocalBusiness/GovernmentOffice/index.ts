import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import GovernmentOfficeComponent from "../../../../../../components/Thing/Organization/LocalBusiness/GovernmentOffice/index.tsx"

export interface GovernmentOfficeProps {
}

type GovernmentOffice =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& GovernmentOfficeProps

export default GovernmentOffice
