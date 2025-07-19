// ProfessionalService extends LocalBusiness but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface ProfessionalServiceProps {}

type ProfessionalService =
	& Thing
	& LocalBusinessProps
	& PlaceProps
	& ProfessionalServiceProps

export default ProfessionalService
