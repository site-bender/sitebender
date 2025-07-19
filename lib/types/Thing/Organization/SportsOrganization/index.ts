import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface SportsOrganizationProps {
	/** A type of sport (e.g. Baseball). */
	sport?: URL | Text
}

type SportsOrganization =
	& Thing
	& OrganizationProps
	& SportsOrganizationProps

export default SportsOrganization
