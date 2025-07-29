import type BaseProps from "../../../../../types/index.ts"
import type StatisticalVariableProps from "../../../../../types/Thing/Intangible/ConstraintNode/StatisticalVariable/index.ts"

import ConstraintNode from "../index.tsx"

export type Props = StatisticalVariableProps & BaseProps

export default function StatisticalVariable({
	measuredProperty,
	measurementDenominator,
	measurementMethod,
	measurementQualifier,
	measurementTechnique,
	populationType,
	statType,
	_type = "StatisticalVariable",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ConstraintNode
			{...props}
			_type={_type}
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
