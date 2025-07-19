// Optician extends MedicalBusiness but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { MedicalBusinessProps } from "../../../../Place/LocalBusiness/MedicalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface OpticianProps {}

type Optician =
	& Thing
	& LocalBusinessProps
	& MedicalBusinessProps
	& PlaceProps
	& OpticianProps

export default Optician
