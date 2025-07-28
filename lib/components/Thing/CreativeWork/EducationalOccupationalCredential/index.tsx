import type BaseProps from "../../../../types/index.ts"
import type { EducationalOccupationalCredentialProps } from "../../../../types/Thing/CreativeWork/EducationalOccupationalCredential/index.ts"

import CreativeWork from "../index.tsx"

export type Props = EducationalOccupationalCredentialProps & BaseProps

export default function EducationalOccupationalCredential({
	competencyRequired,
	credentialCategory,
	educationalLevel,
	recognizedBy,
	validFor,
	validIn,
	_type = "EducationalOccupationalCredential",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
