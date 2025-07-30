import type BaseProps from "../../../../types/index.ts"
import type SeriesProps from "../../../../types/Thing/Intangible/Series/index.ts"

import Intangible from "../index.tsx"

export type Props = SeriesProps & BaseProps

export default function Series({
	_type = "Series",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
