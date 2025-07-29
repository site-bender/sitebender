import type BaseProps from "../../../../../types/index.ts"
import type PreventionIndicationProps from "../../../../../types/Thing/MedicalEntity/MedicalIndication/PreventionIndication/index.ts"

import MedicalIndication from "../index.tsx"

export type Props = PreventionIndicationProps & BaseProps

export default function PreventionIndication({
	_type = "PreventionIndication",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalIndication
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
