import type BaseProps from "../../../../types/index.ts"
import type { MedicalIndicationProps } from "../../../../types/Thing/MedicalEntity/MedicalIndication/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalIndicationProps & BaseProps

export default function MedicalIndication({
	_type = "MedicalIndication",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
