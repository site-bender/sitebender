import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { BeautySalonType } from "./BeautySalon/index.ts"
import type { DaySpaType } from "./DaySpa/index.ts"
import type { HairSalonType } from "./HairSalon/index.ts"
import type { HealthClubType } from "./HealthClub/index.ts"
import type { NailSalonType } from "./NailSalon/index.ts"
import type { TattooParlorType } from "./TattooParlor/index.ts"

export type HealthAndBeautyBusinessType =
	| "HealthAndBeautyBusiness"
	| NailSalonType
	| HealthClubType
	| DaySpaType
	| TattooParlorType
	| HairSalonType
	| BeautySalonType

export interface HealthAndBeautyBusinessProps {
	"@type"?: HealthAndBeautyBusinessType
}

type HealthAndBeautyBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& HealthAndBeautyBusinessProps

export default HealthAndBeautyBusiness
