import type BaseProps from "../../../../../types/index.ts"
import type { EngineSpecificationProps } from "../../../../../types/Thing/Intangible/StructuredValue/EngineSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = EngineSpecificationProps & BaseProps

export default function EngineSpecification({
	engineDisplacement,
	enginePower,
	engineType,
	fuelType,
	torque,
	_type = "EngineSpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				engineDisplacement,
				enginePower,
				engineType,
				fuelType,
				torque,
				...subtypeProperties,
			}}
		/>
	)
}
