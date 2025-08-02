import type BaseProps from "../../../../types/index.ts"
import type MenuItemProps from "../../../../types/Thing/Intangible/MenuItem/index.ts"

import Intangible from "../index.tsx"

export type Props = MenuItemProps & BaseProps

export default function MenuItem({
	menuAddOn,
	nutrition,
	offers,
	suitableForDiet,
	_type = "MenuItem",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				menuAddOn,
				nutrition,
				offers,
				suitableForDiet,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
