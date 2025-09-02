import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HealthAndBeautyBusinessProps } from "../index.ts"

export type TattooParlorType = "TattooParlor"

export interface TattooParlorProps {
	"@type"?: TattooParlorType
}

type TattooParlor =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HealthAndBeautyBusinessProps
	& OrganizationProps
	& TattooParlorProps

export default TattooParlor
