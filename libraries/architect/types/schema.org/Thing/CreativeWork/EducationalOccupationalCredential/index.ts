import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import DefinedTermComponent from "../../../../../../pagewright/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import DurationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import OrganizationComponent from "../../../../../../pagewright/src/define/Thing/Organization/index.tsx"
import AdministrativeAreaComponent from "../../../../../../pagewright/src/define/Thing/Place/AdministrativeArea/index.tsx"

export type EducationalOccupationalCredentialType =
	"EducationalOccupationalCredential"

export interface EducationalOccupationalCredentialProps {
	"@type"?: EducationalOccupationalCredentialType
	competencyRequired?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	credentialCategory?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	educationalLevel?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	recognizedBy?: Organization | ReturnType<typeof OrganizationComponent>
	validFor?: Duration | ReturnType<typeof DurationComponent>
	validIn?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
}

type EducationalOccupationalCredential =
	& Thing
	& CreativeWorkProps
	& EducationalOccupationalCredentialProps

export default EducationalOccupationalCredential
