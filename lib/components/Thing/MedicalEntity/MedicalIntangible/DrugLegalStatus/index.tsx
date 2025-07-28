import type BaseProps from "../../../../../types/index.ts"
import type { DrugLegalStatusProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/DrugLegalStatus/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = DrugLegalStatusProps & BaseProps

export default function DrugLegalStatus({
	applicableLocation,
	_type = "DrugLegalStatus",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalIntangible
			{...props}
			_type={_type}
			subtypeProperties={{
				applicableLocation,
				...subtypeProperties,
			}}
		/>
	)
}
