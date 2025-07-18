import type { Text, URL } from "../../../DataType/index.ts"
import type Organization from "../index.ts"

export default interface SportsOrganization extends Organization {
	/** A type of sport (e.g. Baseball). */
	sport?: URL | Text
}
