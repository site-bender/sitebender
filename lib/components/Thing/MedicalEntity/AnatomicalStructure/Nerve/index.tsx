import type BaseProps from "../../../../../types/index.ts"
import type NerveProps from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Nerve/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = NerveProps & BaseProps

export default function Nerve({
	branch,
	nerveMotor,
	sensoryUnit,
	sourcedFrom,
	_type = "Nerve",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AnatomicalStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				branch,
				nerveMotor,
				sensoryUnit,
				sourcedFrom,
				...subtypeProperties,
			}}
		/>
	)
}
