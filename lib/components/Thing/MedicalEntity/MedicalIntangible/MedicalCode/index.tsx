import type BaseProps from "../../../../../types/index.ts"
import type { MedicalCodeProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/MedicalCode/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = MedicalCodeProps & BaseProps

export default function MedicalCode({
	codeValue,
	codingSystem,
	_type = "MedicalCode",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalIntangible
			{...props}
			_type={_type}
			subtypeProperties={{
				codeValue,
				codingSystem,
				...subtypeProperties,
			}}
		/>
	)
}
