import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"

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
