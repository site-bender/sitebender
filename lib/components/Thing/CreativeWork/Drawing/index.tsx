import type BaseProps from "../../../../types/index.ts"
import type DrawingProps from "../../../../types/Thing/CreativeWork/Drawing/index.ts"

import CreativeWork from "../index.tsx"

export type Props = DrawingProps & BaseProps

export default function Drawing({
	_type = "Drawing",
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
