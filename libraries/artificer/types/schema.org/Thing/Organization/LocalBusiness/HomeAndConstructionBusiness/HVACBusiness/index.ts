import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"

export type HVACBusinessType = "HVACBusiness"

export interface HVACBusinessProps {
	"@type"?: HVACBusinessType
}

type HVACBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& HVACBusinessProps

export default HVACBusiness
