import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"

export type AutoRepairType = "AutoRepair"

export interface AutoRepairProps {
	"@type"?: AutoRepairType
}

type AutoRepair =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& AutomotiveBusinessProps
	& OrganizationProps
	& AutoRepairProps

export default AutoRepair
