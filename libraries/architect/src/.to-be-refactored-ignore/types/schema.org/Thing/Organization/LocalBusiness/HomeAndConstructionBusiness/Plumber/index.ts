import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"

export type PlumberType = "Plumber"

export interface PlumberProps {
	"@type"?: PlumberType
}

type Plumber =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& PlumberProps

export default Plumber
