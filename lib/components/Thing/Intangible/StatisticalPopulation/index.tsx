import type BaseProps from "../../../../types/index.ts"
import type StatisticalPopulationProps from "../../../../types/Thing/Intangible/StatisticalPopulation/index.ts"

import Intangible from "../index.tsx"

export type Props = StatisticalPopulationProps & BaseProps

export default function StatisticalPopulation({
	populationType,
	_type = "StatisticalPopulation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				populationType,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
