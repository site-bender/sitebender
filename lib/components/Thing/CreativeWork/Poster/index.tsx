import type BaseProps from "../../../../types/index.ts"
import type PosterProps from "../../../../types/Thing/CreativeWork/Poster/index.ts"

import CreativeWork from "../index.tsx"

export type Props = PosterProps & BaseProps

export default function Poster({
	_type = "Poster",
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
