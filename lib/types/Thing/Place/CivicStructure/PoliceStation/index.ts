import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../../Organization/index.ts"
import type { LocalBusinessProps } from "../../../Organization/LocalBusiness/index.ts"
import type { EmergencyServiceProps } from "../../../Organization/LocalBusiness/EmergencyService/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import PoliceStationComponent from "../../../../../../components/Thing/Place/CivicStructure/PoliceStation/index.tsx"

export interface PoliceStationProps {
}

type PoliceStation =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& EmergencyServiceProps
	& PlaceProps
	& CivicStructureProps
	& PoliceStationProps

export default PoliceStation
