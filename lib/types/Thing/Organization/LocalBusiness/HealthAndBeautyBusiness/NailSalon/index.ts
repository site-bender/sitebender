import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HealthAndBeautyBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import NailSalonComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/NailSalon/index.tsx"

export interface NailSalonProps {
}

type NailSalon =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HealthAndBeautyBusinessProps
	& OrganizationProps
	& NailSalonProps

export default NailSalon
