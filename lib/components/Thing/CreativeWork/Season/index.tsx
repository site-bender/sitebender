import type BaseProps from "../../../../types/index.ts"
import type SeasonProps from "../../../../types/Thing/CreativeWork/Season/index.ts"

import CreativeWork from "../index.tsx"

export type Props = SeasonProps & BaseProps

export default function Season({
	_type = "Season",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
