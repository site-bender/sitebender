import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import TennisComplexComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/SportsActivityLocation/TennisComplex/index.tsx"

export interface TennisComplexProps {
}

type TennisComplex =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& OrganizationProps
	& TennisComplexProps

export default TennisComplex
