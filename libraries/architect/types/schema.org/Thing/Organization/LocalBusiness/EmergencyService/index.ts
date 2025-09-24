import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { FireStationType } from "./FireStation/index.ts"
import type { HospitalType } from "./Hospital/index.ts"
import type { PoliceStationType } from "./PoliceStation/index.ts"

export type EmergencyServiceType =
	| "EmergencyService"
	| PoliceStationType
	| HospitalType
	| FireStationType

export interface EmergencyServiceProps {
	"@type"?: EmergencyServiceType
}

type EmergencyService =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& EmergencyServiceProps

export default EmergencyService
