import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { CreativeWorkSeriesProps } from "../../../../types/Thing/CreativeWork/CreativeWorkSeries/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	CreativeWorkSeriesProps,
	"CreativeWorkSeries",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function CreativeWorkSeries({
	endDate,
	issn,
	startDate,
	schemaType = "CreativeWorkSeries",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				endDate,
				issn,
				startDate,
				...subtypeProperties,
			}}
		/>
	)
}
