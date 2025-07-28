import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HealthAndBeautyBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import TattooParlorComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/TattooParlor/index.tsx"

export interface TattooParlorProps {
}

type TattooParlor =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HealthAndBeautyBusinessProps
	& OrganizationProps
	& TattooParlorProps

export default TattooParlor
