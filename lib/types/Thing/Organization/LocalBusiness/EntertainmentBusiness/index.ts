import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import EntertainmentBusinessComponent from "../../../../../../components/Thing/Organization/LocalBusiness/EntertainmentBusiness/index.tsx"

export interface EntertainmentBusinessProps {
}

type EntertainmentBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& EntertainmentBusinessProps

export default EntertainmentBusiness
