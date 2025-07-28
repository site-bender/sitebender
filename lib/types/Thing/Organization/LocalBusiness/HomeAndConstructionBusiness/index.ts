import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface HomeAndConstructionBusinessProps {}

type HomeAndConstructionBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& HomeAndConstructionBusinessProps

export default HomeAndConstructionBusiness
