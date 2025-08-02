import type BaseProps from "../../../../../types/index.ts"
import type DietProps from "../../../../../types/Thing/MedicalEntity/LifestyleModification/Diet/index.ts"

import LifestyleModification from "../index.tsx"

export type Props = DietProps & BaseProps

export default function Diet(
	{
		dietFeatures,
		endorsers,
		expertConsiderations,
		physiologicalBenefits,
		risks,
		_type = "Diet",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<LifestyleModification
			{...props}
			_type={_type}
			subtypeProperties={{
				dietFeatures,
				endorsers,
				expertConsiderations,
				physiologicalBenefits,
				risks,
				...subtypeProperties,
			}}
		>
			{children}
		</LifestyleModification>
	)
}
