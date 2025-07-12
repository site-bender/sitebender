import type { Text } from "../../../DataType/index.ts"
import type { AdministrativeArea, Duration, URL } from "../../index.ts"
import type { DefinedTerm } from "../../Intangible/DefinedTerm/index.ts"
import type { Organization } from "../../Organization/index.ts"
import type { CreativeWork } from "../index.ts"

// EducationalOccupationalCredential interface - extends CreativeWork
// An educational or occupational credential. A diploma, academic degree, certification, qualification, badge, etc.,
// that may be awarded to a person or other entity that meets the requirements defined by the credentialer.
export interface EducationalOccupationalCredential extends CreativeWork {
	competencyRequired?: DefinedTerm | Text | URL
	credentialCategory?: DefinedTerm | Text | URL
	educationalLevel?: DefinedTerm | Text | URL
	recognizedBy?: Organization
	validFor?: Duration
	validIn?: AdministrativeArea
}
