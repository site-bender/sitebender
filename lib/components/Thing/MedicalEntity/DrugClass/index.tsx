import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { DrugClassProps } from "../../../../types/Thing/MedicalEntity/DrugClass/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	DrugClassProps,
	"DrugClass",
	ExtractLevelProps<ThingProps, MedicalEntityProps>
>

export default function DrugClass({
	drug,
	schemaType = "DrugClass",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				drug,
				...subtypeProperties,
			}}
		/>
	)
}
