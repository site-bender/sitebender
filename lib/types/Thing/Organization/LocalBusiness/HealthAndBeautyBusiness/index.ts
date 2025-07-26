import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

export interface HealthAndBeautyBusinessProps {
}

type HealthAndBeautyBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& HealthAndBeautyBusinessProps

export default HealthAndBeautyBusiness
