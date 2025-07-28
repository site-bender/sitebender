import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalIntangibleProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/index.ts"
import type { MedicalCodeProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/MedicalCode/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalCodeProps,
	"MedicalCode",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalIntangibleProps>
>

export default function MedicalCode({
	codeValue,
	codingSystem,
	schemaType = "MedicalCode",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalIntangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				codeValue,
				codingSystem,
				...subtypeProperties,
			}}
		/>
	)
}
