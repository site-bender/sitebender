import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import BookStoreComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/BookStore/index.tsx"

export interface BookStoreProps {
}

type BookStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& BookStoreProps

export default BookStore
