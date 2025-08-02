import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

export type CountryType = "Country"

export interface CountryProps {
	"@type"?: CountryType
}

type Country = Thing & PlaceProps & AdministrativeAreaProps & CountryProps

export default Country
