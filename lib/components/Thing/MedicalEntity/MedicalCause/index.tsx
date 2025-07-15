import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalCauseProps from "../../../../types/Thing/MedicalCause/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"

import MedicalEntity from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalCauseProps,
	"MedicalCause",
	ExtractLevelProps<MedicalCauseProps, MedicalEntityProps>
>

export default function MedicalCause(
	{
		causeOf,
		schemaType = "MedicalCause",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				causeOf,
				...subtypeProperties,
			}}
		/>
	)
}
