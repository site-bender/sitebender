import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type ComicSeriesProps from "../../../../../../../types/Thing/ComicSeries/index.ts"
import type PeriodicalProps from "../../../../../../../types/Thing/Periodical/index.ts"

import Periodical from "./index.tsx"

// ComicSeries adds no properties to the Periodical schema type
export type Props = BaseComponentProps<
	ComicSeriesProps,
	"ComicSeries",
	ExtractLevelProps<ComicSeriesProps, PeriodicalProps>
>

export default function ComicSeries({
	schemaType = "ComicSeries",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Periodical
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
