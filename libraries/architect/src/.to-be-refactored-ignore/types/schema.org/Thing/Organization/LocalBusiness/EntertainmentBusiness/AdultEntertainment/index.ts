import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { EntertainmentBusinessProps } from "../index.ts"

export type AdultEntertainmentType = "AdultEntertainment"

export interface AdultEntertainmentProps {
	"@type"?: AdultEntertainmentType
}

type AdultEntertainment =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& EntertainmentBusinessProps
	& OrganizationProps
	& AdultEntertainmentProps

export default AdultEntertainment
