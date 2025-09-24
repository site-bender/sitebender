import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"

export type RoofingContractorType = "RoofingContractor"

export interface RoofingContractorProps {
	"@type"?: RoofingContractorType
}

type RoofingContractor =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& RoofingContractorProps

export default RoofingContractor
