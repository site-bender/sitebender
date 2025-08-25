import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"
import type { CityType } from "./City/index.ts"
import type { CountryType } from "./Country/index.ts"
import type { SchoolDistrictType } from "./SchoolDistrict/index.ts"
import type { StateType } from "./State/index.ts"

export type AdministrativeAreaType =
	| "AdministrativeArea"
	| CityType
	| SchoolDistrictType
	| StateType
	| CountryType

export interface AdministrativeAreaProps {
	"@type"?: AdministrativeAreaType
}

type AdministrativeArea = Thing & PlaceProps & AdministrativeAreaProps

export default AdministrativeArea
