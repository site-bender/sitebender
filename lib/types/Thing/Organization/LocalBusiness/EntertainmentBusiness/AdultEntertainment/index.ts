import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { EntertainmentBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import AdultEntertainmentComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/EntertainmentBusiness/AdultEntertainment/index.tsx"

export interface AdultEntertainmentProps {
}

type AdultEntertainment =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& EntertainmentBusinessProps
	& OrganizationProps
	& AdultEntertainmentProps

export default AdultEntertainment
