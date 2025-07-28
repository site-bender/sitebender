import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { EducationalOccupationalCredentialProps } from "../../../../types/Thing/CreativeWork/EducationalOccupationalCredential/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	EducationalOccupationalCredentialProps,
	"EducationalOccupationalCredential",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function EducationalOccupationalCredential({
	competencyRequired,
	credentialCategory,
	educationalLevel,
	recognizedBy,
	validFor,
	validIn,
	schemaType = "EducationalOccupationalCredential",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				competencyRequired,
				credentialCategory,
				educationalLevel,
				recognizedBy,
				validFor,
				validIn,
				...subtypeProperties,
			}}
		/>
	)
}
