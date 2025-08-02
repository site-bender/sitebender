import type BaseProps from "../../../../types/index.ts"
import type PhotographProps from "../../../../types/Thing/CreativeWork/Photograph/index.ts"

import CreativeWork from "../index.tsx"

export type Props = PhotographProps & BaseProps

export default function Photograph({
	_type = "Photograph",
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
