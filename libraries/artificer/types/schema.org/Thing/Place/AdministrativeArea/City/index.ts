import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

export type CityType = "City"

export interface CityProps {
	"@type"?: CityType
}

type City = Thing & PlaceProps & AdministrativeAreaProps & CityProps

export default City
