import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HealthAndBeautyBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

export interface DaySpaProps {
}

type DaySpa =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HealthAndBeautyBusinessProps
	& OrganizationProps
	& DaySpaProps

export default DaySpa
