import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HealthAndBeautyBusinessProps } from "../index.ts"

export type BeautySalonType = "BeautySalon"

export interface BeautySalonProps {
	"@type"?: BeautySalonType
}

type BeautySalon =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HealthAndBeautyBusinessProps
	& OrganizationProps
	& BeautySalonProps

export default BeautySalon
