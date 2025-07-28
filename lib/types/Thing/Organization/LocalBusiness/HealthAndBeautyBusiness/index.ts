import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import HealthAndBeautyBusinessComponent from "../../../../../../components/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/index.tsx"

export interface HealthAndBeautyBusinessProps {
}

type HealthAndBeautyBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& HealthAndBeautyBusinessProps

export default HealthAndBeautyBusiness
