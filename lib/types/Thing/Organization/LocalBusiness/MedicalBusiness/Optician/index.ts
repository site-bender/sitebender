import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { MedicalBusinessProps } from "../index.ts"

export type OpticianType = "Optician"

export interface OpticianProps {
	"@type"?: OpticianType
}

type Optician =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& MedicalBusinessProps
	& OrganizationProps
	& OpticianProps

export default Optician
