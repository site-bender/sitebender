import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { EntertainmentBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import NightClubComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/EntertainmentBusiness/NightClub/index.tsx"

export interface NightClubProps {
}

type NightClub =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& EntertainmentBusinessProps
	& OrganizationProps
	& NightClubProps

export default NightClub
