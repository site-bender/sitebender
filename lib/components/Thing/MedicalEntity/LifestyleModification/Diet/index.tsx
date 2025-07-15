import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DietProps from "../../../../../types/Thing/Diet/index.ts"
import type LifestyleModificationProps from "../../../../../types/Thing/LifestyleModification/index.ts"

import LifestyleModification from "./index.tsx"

export type Props = BaseComponentProps<
	DietProps,
	"Diet",
	ExtractLevelProps<DietProps, LifestyleModificationProps>
>

export default function Diet(
	{
		dietFeatures,
		endorsers,
		expertConsiderations,
		physiologicalBenefits,
		risks,
		schemaType = "Diet",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<LifestyleModification
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				dietFeatures,
				endorsers,
				expertConsiderations,
				physiologicalBenefits,
				risks,
				...subtypeProperties,
			}}
		/>
	)
}
