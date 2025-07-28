import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type Organization from "../../Organization/index.ts"

import EducationalOccupationalCredentialComponent from "../../../../../components/Thing/CreativeWork/EducationalOccupationalCredential/index.tsx"

export interface EducationalOccupationalCredentialProps {
	competencyRequired?: DefinedTerm | Text | URL
	credentialCategory?: DefinedTerm | Text | URL
	educationalLevel?: DefinedTerm | Text | URL
	recognizedBy?: Organization
	validFor?: Duration
	validIn?: AdministrativeArea
}

type EducationalOccupationalCredential =
	& Thing
	& CreativeWorkProps
	& EducationalOccupationalCredentialProps

export default EducationalOccupationalCredential
