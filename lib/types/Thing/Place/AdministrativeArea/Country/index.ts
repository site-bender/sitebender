import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

import CountryComponent from "../../../../../../components/Thing/Place/AdministrativeArea/Country/index.tsx"

export interface CountryProps {
}

type Country =
	& Thing
	& PlaceProps
	& AdministrativeAreaProps
	& CountryProps

export default Country
