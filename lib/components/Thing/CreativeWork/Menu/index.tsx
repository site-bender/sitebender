import type BaseProps from "../../../../types/index.ts"
import type MenuProps from "../../../../types/Thing/CreativeWork/Menu/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MenuProps & BaseProps

export default function Menu({
	hasMenuItem,
	hasMenuSection,
	_type = "Menu",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				hasMenuItem,
				hasMenuSection,
				...subtypeProperties,
			}}
		>{children}</CreativeWork>
	)
}
