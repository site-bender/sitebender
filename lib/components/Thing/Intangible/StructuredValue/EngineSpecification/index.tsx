import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EngineSpecificationProps from "../../../../../types/Thing/EngineSpecification/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	EngineSpecificationProps,
	"EngineSpecification",
	ExtractLevelProps<EngineSpecificationProps, StructuredValueProps>
>

export default function EngineSpecification(
	{
		engineDisplacement,
		enginePower,
		engineType,
		fuelType,
		torque,
		schemaType = "EngineSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
