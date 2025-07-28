import type BaseProps from "../../../../../../types/index.ts"
import type { OpticianProps } from "../../../../../../types/Thing/Organization/LocalBusiness/MedicalBusiness/Optician/index.ts"

import MedicalBusiness from "../index.tsx"

export type Props = OpticianProps & BaseProps

export default function Optician({
	_type = "Optician",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
