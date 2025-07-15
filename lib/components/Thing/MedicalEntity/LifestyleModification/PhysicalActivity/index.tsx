import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LifestyleModificationProps from "../../../../../types/Thing/LifestyleModification/index.ts"
import type PhysicalActivityProps from "../../../../../types/Thing/PhysicalActivity/index.ts"

import LifestyleModification from "./index.tsx"

export type Props = BaseComponentProps<
	PhysicalActivityProps,
	"PhysicalActivity",
	ExtractLevelProps<PhysicalActivityProps, LifestyleModificationProps>
>

export default function PhysicalActivity(
	{
		associatedAnatomy,
		category,
		epidemiology,
		pathophysiology,
		schemaType = "PhysicalActivity",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<LifestyleModification
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				associatedAnatomy,
				category,
				epidemiology,
				pathophysiology,
				...subtypeProperties,
			}}
		/>
	)
}
