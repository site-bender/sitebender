import type BaseProps from "../../../../types/index.ts"
import type SheetMusicProps from "../../../../types/Thing/CreativeWork/SheetMusic/index.ts"

import CreativeWork from "../index.tsx"

export type Props = SheetMusicProps & BaseProps

export default function SheetMusic({
	_type = "SheetMusic",
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
		>{children}</CreativeWork>
	)
}
