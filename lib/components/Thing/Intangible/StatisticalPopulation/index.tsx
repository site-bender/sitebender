import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { StatisticalPopulationProps } from "../../../../types/Thing/Intangible/StatisticalPopulation/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	StatisticalPopulationProps,
	"StatisticalPopulation",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function StatisticalPopulation({
	populationType,
	schemaType = "StatisticalPopulation",
	subtypeProperties = {},
	...props
}): Props {
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
