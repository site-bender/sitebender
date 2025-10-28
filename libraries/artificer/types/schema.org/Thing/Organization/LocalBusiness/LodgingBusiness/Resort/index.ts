import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LodgingBusinessProps } from "../index.ts"
import type { SkiResortType } from "./SkiResort/index.ts"

export type ResortType = "Resort" | SkiResortType

export interface ResortProps {
	"@type"?: ResortType
}

type Resort =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& LodgingBusinessProps
	& OrganizationProps
	& ResortProps

export default Resort
