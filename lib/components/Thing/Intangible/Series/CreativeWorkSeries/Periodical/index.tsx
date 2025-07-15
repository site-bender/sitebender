import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CreativeWorkSeriesProps from "../../../../../../types/Thing/CreativeWorkSeries/index.ts"
import type PeriodicalProps from "../../../../../../types/Thing/Periodical/index.ts"

import CreativeWorkSeries from "./index.tsx"

// Periodical adds no properties to the CreativeWorkSeries schema type
export type Props = BaseComponentProps<
	PeriodicalProps,
	"Periodical",
	ExtractLevelProps<PeriodicalProps, CreativeWorkSeriesProps>
>

export default function Periodical({
	schemaType = "Periodical",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWorkSeries
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
