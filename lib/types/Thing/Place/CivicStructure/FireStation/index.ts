import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../../Organization/index.ts"
import type { LocalBusinessProps } from "../../../Organization/LocalBusiness/index.ts"
import type { EmergencyServiceProps } from "../../../Organization/LocalBusiness/EmergencyService/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import FireStationComponent from "../../../../../../components/Thing/Place/CivicStructure/FireStation/index.tsx"

export interface FireStationProps {
}

type FireStation =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& EmergencyServiceProps
	& PlaceProps
	& CivicStructureProps
	& FireStationProps

export default FireStation
