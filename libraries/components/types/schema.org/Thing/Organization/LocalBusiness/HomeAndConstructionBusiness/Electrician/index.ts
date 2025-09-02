import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"

export type ElectricianType = "Electrician"

export interface ElectricianProps {
	"@type"?: ElectricianType
}

type Electrician =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& ElectricianProps

export default Electrician
