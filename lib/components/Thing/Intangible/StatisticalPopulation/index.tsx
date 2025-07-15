import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type StatisticalPopulationProps from "../../../../types/Thing/StatisticalPopulation/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	StatisticalPopulationProps,
	"StatisticalPopulation",
	ExtractLevelProps<StatisticalPopulationProps, IntangibleProps>
>

export default function StatisticalPopulation(
	{
		populationType,
		schemaType = "StatisticalPopulation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				populationType,
				...subtypeProperties,
			}}
		/>
	)
}
