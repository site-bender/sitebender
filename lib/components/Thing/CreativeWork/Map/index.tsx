import type BaseProps from "../../../../types/index.ts"
import type MapProps from "../../../../types/Thing/CreativeWork/Map/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MapProps & BaseProps

export default function Map({
	mapType,
	_type = "Map",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				mapType,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
