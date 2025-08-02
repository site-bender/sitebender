import type BaseProps from "../../../../../types/index.ts"
import type InfectiousDiseaseProps from "../../../../../types/Thing/MedicalEntity/MedicalCondition/InfectiousDisease/index.ts"

import MedicalCondition from "../index.tsx"

export type Props = InfectiousDiseaseProps & BaseProps

export default function InfectiousDisease({
	infectiousAgent,
	infectiousAgentClass,
	transmissionMethod,
	_type = "InfectiousDisease",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalCondition
			{...props}
			_type={_type}
			subtypeProperties={{
				infectiousAgent,
				infectiousAgentClass,
				transmissionMethod,
				...subtypeProperties,
			}}
		>
			{children}
		</MedicalCondition>
	)
}
