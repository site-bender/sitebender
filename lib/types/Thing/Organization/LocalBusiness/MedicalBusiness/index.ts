import type Thing from "../../../index.ts"
import type LocalBusiness from "../index.ts"
import type { LocalBusinessProps } from "../index.ts"

// MedicalBusiness extends LocalBusiness but adds no additional properties

export interface MedicalBusinessProps {
}

type MedicalBusiness = Thing & LocalBusinessProps & MedicalBusinessProps

export default MedicalBusiness
