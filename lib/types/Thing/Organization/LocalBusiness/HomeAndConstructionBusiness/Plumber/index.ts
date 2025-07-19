// Plumber extends HomeAndConstructionBusiness but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { HomeAndConstructionBusinessProps } from "../../../../Place/LocalBusiness/HomeAndConstructionBusiness/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface PlumberProps {}

type Plumber =
	& Thing
	& HomeAndConstructionBusinessProps
	& LocalBusinessProps
	& PlaceProps
	& PlumberProps

export default Plumber
