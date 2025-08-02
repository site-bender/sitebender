import type BaseProps from "../../../../../types/index.ts"
import type MuscleProps from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Muscle/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = MuscleProps & BaseProps

export default function Muscle({
	antagonist,
	bloodSupply,
	insertion,
	muscleAction,
	nerve,
	_type = "Muscle",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AnatomicalStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				antagonist,
				bloodSupply,
				insertion,
				muscleAction,
				nerve,
				...subtypeProperties,
			}}
		>
			{children}
		</AnatomicalStructure>
	)
}
