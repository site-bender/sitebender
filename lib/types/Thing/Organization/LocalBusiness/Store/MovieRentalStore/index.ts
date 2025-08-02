import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type MovieRentalStoreType = "MovieRentalStore"

export interface MovieRentalStoreProps {
	"@type"?: MovieRentalStoreType
}

type MovieRentalStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& MovieRentalStoreProps

export default MovieRentalStore
