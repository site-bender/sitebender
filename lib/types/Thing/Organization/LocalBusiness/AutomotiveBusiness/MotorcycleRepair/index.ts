import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import MotorcycleRepairComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/AutomotiveBusiness/MotorcycleRepair/index.tsx"

export interface MotorcycleRepairProps {
}

type MotorcycleRepair =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& AutomotiveBusinessProps
	& OrganizationProps
	& MotorcycleRepairProps

export default MotorcycleRepair
