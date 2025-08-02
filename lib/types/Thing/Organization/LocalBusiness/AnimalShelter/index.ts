import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type AnimalShelterType = "AnimalShelter"

export interface AnimalShelterProps {
	"@type"?: AnimalShelterType
}

type AnimalShelter =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& AnimalShelterProps

export default AnimalShelter
