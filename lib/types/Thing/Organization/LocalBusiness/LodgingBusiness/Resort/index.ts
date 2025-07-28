import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LodgingBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import ResortComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/LodgingBusiness/Resort/index.tsx"

export interface ResortProps {
}

type Resort =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& LodgingBusinessProps
	& OrganizationProps
	& ResortProps

export default Resort
