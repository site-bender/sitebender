import type BaseProps from "../../../../../../types/index.ts"
import type ComicSeriesProps from "../../../../../../types/Thing/CreativeWork/CreativeWorkSeries/Periodical/ComicSeries/index.ts"

import Periodical from "../index.tsx"

export type Props = ComicSeriesProps & BaseProps

export default function ComicSeries({
	_type = "ComicSeries",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Periodical
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Periodical>
	)
}
