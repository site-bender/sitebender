import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../index.ts"

export type TennisComplexType = "TennisComplex"

export interface TennisComplexProps {
	"@type"?: TennisComplexType
}

type TennisComplex =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& OrganizationProps
	& TennisComplexProps

export default TennisComplex
