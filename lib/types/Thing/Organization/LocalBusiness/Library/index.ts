import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import LibraryComponent from "../../../../../../components/Thing/Organization/LocalBusiness/Library/index.tsx"

export interface LibraryProps {
}

type Library =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& LibraryProps

export default Library
