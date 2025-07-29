import type BaseProps from "../../../../../../types/index.ts"
import type SteeringPositionValueProps from "../../../../../../types/Thing/Intangible/Enumeration/QualitativeValue/SteeringPositionValue/index.ts"

import QualitativeValue from "../index.tsx"

export type Props = SteeringPositionValueProps & BaseProps

export default function SteeringPositionValue({
	_type = "SteeringPositionValue",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<QualitativeValue
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
