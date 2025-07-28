import type Thing from "../../../../index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../../SportsActivityLocation/index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { HealthAndBeautyBusinessProps } from "../index.ts"

import HealthClubComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/HealthClub/index.tsx"

export interface HealthClubProps {
}

type HealthClub =
	& Thing
	& OrganizationProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& PlaceProps
	& HealthAndBeautyBusinessProps
	& HealthClubProps

export default HealthClub
