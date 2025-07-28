import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { EngineSpecificationProps } from "../../../../../types/Thing/Intangible/StructuredValue/EngineSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	EngineSpecificationProps,
	"EngineSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function EngineSpecification({
	engineDisplacement,
	enginePower,
	engineType,
	fuelType,
	torque,
	schemaType = "EngineSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
