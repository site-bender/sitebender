import type BaseProps from "../../../../types/index.ts"
import type { MedicalDeviceProps } from "../../../../types/Thing/MedicalEntity/MedicalDevice/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalDeviceProps & BaseProps

export default function MedicalDevice({
	adverseOutcome,
	contraindication,
	postOp,
	preOp,
	procedure,
	seriousAdverseOutcome,
	_type = "MedicalDevice",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				adverseOutcome,
				contraindication,
				postOp,
				preOp,
				procedure,
				seriousAdverseOutcome,
				...subtypeProperties,
			}}
		/>
	)
}
