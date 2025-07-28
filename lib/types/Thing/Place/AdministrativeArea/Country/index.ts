import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

export interface CountryProps {}

type Country = Thing & PlaceProps & AdministrativeAreaProps & CountryProps

export default Country
