import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

export interface EmergencyServiceProps {
}

type EmergencyService =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& EmergencyServiceProps

export default EmergencyService
