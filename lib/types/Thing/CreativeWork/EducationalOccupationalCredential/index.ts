import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import DurationComponent from "../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import AdministrativeAreaComponent from "../../../../components/Thing/Place/AdministrativeArea/index.ts"

export interface EducationalOccupationalCredentialProps {
	"@type"?: "EducationalOccupationalCredential"
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
	validIn?: AdministrativeArea | ReturnType<typeof AdministrativeAreaComponent>
}

type EducationalOccupationalCredential =
	& Thing
	& CreativeWorkProps
	& EducationalOccupationalCredentialProps

export default EducationalOccupationalCredential
