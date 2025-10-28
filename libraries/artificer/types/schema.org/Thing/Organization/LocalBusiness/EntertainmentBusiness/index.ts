import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { AdultEntertainmentType } from "./AdultEntertainment/index.ts"
import type { AmusementParkType } from "./AmusementPark/index.ts"
import type { ArtGalleryType } from "./ArtGallery/index.ts"
import type { CasinoType } from "./Casino/index.ts"
import type { ComedyClubType } from "./ComedyClub/index.ts"
import type { MovieTheaterType } from "./MovieTheater/index.ts"
import type { NightClubType } from "./NightClub/index.ts"

export type EntertainmentBusinessType =
	| "EntertainmentBusiness"
	| ComedyClubType
	| AdultEntertainmentType
	| AmusementParkType
	| CasinoType
	| MovieTheaterType
	| NightClubType
	| ArtGalleryType

export interface EntertainmentBusinessProps {
	"@type"?: EntertainmentBusinessType
}

type EntertainmentBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& EntertainmentBusinessProps

export default EntertainmentBusiness
