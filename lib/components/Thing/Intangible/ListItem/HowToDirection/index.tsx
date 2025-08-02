import type BaseProps from "../../../../../types/index.ts"
import type HowToDirectionProps from "../../../../../types/Thing/Intangible/ListItem/HowToDirection/index.ts"

import ListItem from "../index.tsx"

// HowToDirection adds no properties to the ListItem schema type
export type Props = HowToDirectionProps & BaseProps

export default function HowToDirection(
	{
		afterMedia,
		beforeMedia,
		duringMedia,
		performTime,
		prepTime,
		supply,
		tool,
		totalTime,
		_type = "HowToDirection",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<ListItem
			{...props}
			_type={_type}
			subtypeProperties={{
				afterMedia,
				beforeMedia,
				duringMedia,
				performTime,
				prepTime,
				supply,
				tool,
				totalTime,
				...subtypeProperties,
			}}
		>
			{children}
		</ListItem>
	)
}
