import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type LifestyleModificationProps from "../../../../types/Thing/LifestyleModification/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"

import MedicalEntity from "./index.tsx"

// LifestyleModification adds no properties to the MedicalEntity schema type
export type Props = BaseComponentProps<
	LifestyleModificationProps,
	"LifestyleModification",
	ExtractLevelProps<LifestyleModificationProps, MedicalEntityProps>
>

export default function LifestyleModification({
	schemaType = "LifestyleModification",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
