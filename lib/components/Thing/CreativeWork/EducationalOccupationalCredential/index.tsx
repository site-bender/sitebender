import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type EducationalOccupationalCredentialProps from "../../../../types/Thing/EducationalOccupationalCredential/index.ts"

import CreativeWork from "./index.tsx"

// EducationalOccupationalCredential adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	EducationalOccupationalCredentialProps,
	"EducationalOccupationalCredential",
	ExtractLevelProps<EducationalOccupationalCredentialProps, CreativeWorkProps>
>

export default function EducationalOccupationalCredential({
	schemaType = "EducationalOccupationalCredential",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
