import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import AutoRepairComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoRepair/index.tsx"

export interface AutoRepairProps {
}

type AutoRepair =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& AutomotiveBusinessProps
	& OrganizationProps
	& AutoRepairProps

export default AutoRepair
