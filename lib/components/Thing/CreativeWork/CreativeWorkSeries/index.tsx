import type BaseProps from "../../../../types/index.ts"
import type CreativeWorkSeriesProps from "../../../../types/Thing/CreativeWork/CreativeWorkSeries/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CreativeWorkSeriesProps & BaseProps

export default function CreativeWorkSeries({
	endDate,
	issn,
	startDate,
	_type = "CreativeWorkSeries",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				endDate,
				issn,
				startDate,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
