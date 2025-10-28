import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

export type SchoolDistrictType = "SchoolDistrict"

export interface SchoolDistrictProps {
	"@type"?: SchoolDistrictType
}

type SchoolDistrict =
	& Thing
	& PlaceProps
	& AdministrativeAreaProps
	& SchoolDistrictProps

export default SchoolDistrict
