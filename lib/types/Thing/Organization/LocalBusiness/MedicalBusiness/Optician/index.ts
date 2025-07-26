import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { MedicalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

export interface OpticianProps {
}

type Optician =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& MedicalBusinessProps
	& OrganizationProps
	& OpticianProps

export default Optician
