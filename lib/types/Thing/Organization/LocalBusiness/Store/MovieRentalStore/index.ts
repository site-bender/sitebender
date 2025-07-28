import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import MovieRentalStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/MovieRentalStore/index.tsx"

export interface MovieRentalStoreProps {
}

type MovieRentalStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& MovieRentalStoreProps

export default MovieRentalStore
