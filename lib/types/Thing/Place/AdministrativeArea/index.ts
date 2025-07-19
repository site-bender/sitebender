// AdministrativeArea extends Place but adds no additional properties
import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AdministrativeAreaProps {}

type AdministrativeArea =
	& Thing
	& PlaceProps
	& AdministrativeAreaProps

export default AdministrativeArea
