import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

import SchoolDistrictComponent from "../../../../../../components/Thing/Place/AdministrativeArea/SchoolDistrict/index.tsx"

export interface SchoolDistrictProps {
}

type SchoolDistrict =
	& Thing
	& PlaceProps
	& AdministrativeAreaProps
	& SchoolDistrictProps

export default SchoolDistrict
