import type BaseProps from "../../../../../../types/index.ts"
import type { NewspaperProps } from "../../../../../../types/Thing/CreativeWork/CreativeWorkSeries/Periodical/Newspaper/index.ts"

import Periodical from "../index.tsx"

export type Props = NewspaperProps & BaseProps

export default function Newspaper({
	_type = "Newspaper",
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
		/>
	)
}
