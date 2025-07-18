import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BookSeriesProps from "../../../../../../types/Thing/BookSeries/index.ts"
import type CreativeWorkSeriesProps from "../../../../../../types/Thing/CreativeWorkSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

// BookSeries adds no properties to the CreativeWorkSeries schema type
export type Props = BaseComponentProps<
	BookSeriesProps,
	"BookSeries",
	ExtractLevelProps<BookSeriesProps, CreativeWorkSeriesProps>
>

export default function BookSeries({
	schemaType = "BookSeries",
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
