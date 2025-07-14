import Person from "../../Person/index.ts"
import Organization from "../index.ts"

export default interface EducationalOrganization extends Organization {
	/** Alumni of an organization. */
	alumni?: Person
}
