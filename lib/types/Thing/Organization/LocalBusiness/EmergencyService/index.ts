import type Thing from "../../../index.ts"
import type LocalBusiness from "../index.ts"
import type { LocalBusinessProps } from "../index.ts"

// EmergencyService extends LocalBusiness but adds no additional properties

export interface EmergencyServiceProps {
}

type EmergencyService = Thing & LocalBusinessProps & EmergencyServiceProps

export default EmergencyService
