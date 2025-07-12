import type { Organization } from "../index.ts"
import type { Person } from "../../Person/index.ts"
import type { Place } from "../../Place/index.ts"

// EducationalOrganization interface - extends both Organization and Place
// An educational organization.
export interface EducationalOrganization extends Organization, Place {
	alumni?: Person
}
