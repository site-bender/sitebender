import { Text, URL } from "../../../DataType/index.ts"
import Organization from "../index.ts"

export default interface SportsOrganization extends Organization {
	/** A type of sport (e.g. Baseball). */
	sport?: URL | Text
}
