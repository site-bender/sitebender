import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type LibraryType = "Library"

export interface LibraryProps {
	"@type"?: LibraryType
}

type Library =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& LibraryProps

export default Library
