// Country extends AdministrativeArea but adds no additional properties
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CountryProps {}

type Country =
	& Thing
	& AdministrativeAreaProps
	& PlaceProps
	& CountryProps

export default Country
