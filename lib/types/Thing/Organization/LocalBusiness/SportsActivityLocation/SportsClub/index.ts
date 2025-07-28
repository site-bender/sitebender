import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import SportsClubComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/SportsActivityLocation/SportsClub/index.tsx"

export interface SportsClubProps {
}

type SportsClub =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& OrganizationProps
	& SportsClubProps

export default SportsClub
