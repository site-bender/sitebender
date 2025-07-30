import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface AnimalShelterProps {
	"@type"?: "AnimalShelter"}

type AnimalShelter =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& AnimalShelterProps

export default AnimalShelter
