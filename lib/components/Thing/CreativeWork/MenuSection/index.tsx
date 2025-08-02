import type BaseProps from "../../../../types/index.ts"
import type MenuSectionProps from "../../../../types/Thing/CreativeWork/MenuSection/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MenuSectionProps & BaseProps

export default function MenuSection({
	hasMenuItem,
	hasMenuSection,
	_type = "MenuSection",
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
		>
			{children}
		</CreativeWork>
	)
}
