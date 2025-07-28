import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

export interface CityProps {}

type City = Thing & PlaceProps & AdministrativeAreaProps & CityProps

export default City
