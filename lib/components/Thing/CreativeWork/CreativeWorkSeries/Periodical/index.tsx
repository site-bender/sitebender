import type BaseProps from "../../../../../types/index.ts"
import type { PeriodicalProps } from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/Periodical/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = PeriodicalProps & BaseProps

export default function Periodical({
	_type = "Periodical",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWorkSeries
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
