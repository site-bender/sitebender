import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"

export type MovingCompanyType = "MovingCompany"

export interface MovingCompanyProps {
	"@type"?: MovingCompanyType
}

type MovingCompany =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& MovingCompanyProps

export default MovingCompany
