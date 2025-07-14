import { Text } from "../../../../DataType/index.ts"
import GenderType from "../../../Intangible/Enumeration/GenderType/index.ts"
import Person from "../../../Person/index.ts"
import SportsOrganization from "../index.ts"

export default interface SportsTeam extends SportsOrganization {
	/** A person that acts as performing member of a sports team; a player as opposed to a coach. */
	athlete?: Person
	/** A person that acts in a coaching role for a sports team. */
	coach?: Person
	/** Gender of something, typically a [[Person]], but possibly also fictional characters, animals, etc. While https://schema.org/Male and https://schema.org/Female may be used, text strings are also acceptable for people who are not a binary gender. The [[gender]] property can also be used in an extended sense to cover e.g. the gender of sports teams. As with the gender of individuals, we do not try to enumerate all possibilities. A mixed-gender [[SportsTeam]] can be indicated with a text value of "Mixed". */
	gender?: GenderType | Text
}
