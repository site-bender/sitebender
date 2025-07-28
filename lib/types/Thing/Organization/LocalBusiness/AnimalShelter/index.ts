import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import AnimalShelterComponent from "../../../../../../components/Thing/Organization/LocalBusiness/AnimalShelter/index.tsx"

export interface AnimalShelterProps {
}

type AnimalShelter =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& AnimalShelterProps

export default AnimalShelter
