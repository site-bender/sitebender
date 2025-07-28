import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ConstraintNodeProps } from "../../../../../types/Thing/Intangible/ConstraintNode/index.ts"
import type { StatisticalVariableProps } from "../../../../../types/Thing/Intangible/ConstraintNode/StatisticalVariable/index.ts"

import ConstraintNode from "../index.tsx"

export type Props = BaseComponentProps<
	StatisticalVariableProps,
	"StatisticalVariable",
	ExtractLevelProps<ThingProps, IntangibleProps, ConstraintNodeProps>
>

export default function StatisticalVariable({
	measuredProperty,
	measurementDenominator,
	measurementMethod,
	measurementQualifier,
	measurementTechnique,
	populationType,
	statType,
	schemaType = "StatisticalVariable",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<ConstraintNode
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				measuredProperty,
				measurementDenominator,
				measurementMethod,
				measurementQualifier,
				measurementTechnique,
				populationType,
				statType,
				...subtypeProperties,
			}}
		/>
	)
}
