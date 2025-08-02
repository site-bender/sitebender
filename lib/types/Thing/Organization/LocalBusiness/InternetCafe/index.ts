import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type InternetCafeType = "InternetCafe"

export interface InternetCafeProps {
	"@type"?: InternetCafeType
}

type InternetCafe =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& InternetCafeProps

export default InternetCafe
