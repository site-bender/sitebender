import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type HowToDirectionProps from "../../../../../types/Thing/HowToDirection/index.ts"
import type ListItemProps from "../../../../../types/Thing/ListItem/index.ts"

import ListItem from "../index.tsx"

export type Props = BaseComponentProps<
	HowToDirectionProps,
	"HowToDirection",
	ExtractLevelProps<HowToDirectionProps, ListItemProps>
>

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
		/>
	)
}
