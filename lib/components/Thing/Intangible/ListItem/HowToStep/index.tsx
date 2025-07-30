import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type HowToStepProps from "../../../../../types/Thing/HowToStep/index.ts"
import type ListItemProps from "../../../../../types/Thing/ListItem/index.ts"

import ListItem from "../index.tsx"

// HowToStep adds no properties to the ListItem schema type
export type Props = BaseComponentProps<
	HowToStepProps,
	"HowToStep",
	ExtractLevelProps<HowToStepProps, ListItemProps>
>

export default function HowToStep({
	_type = "HowToStep",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ListItem
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>{children}</HowToStepProps>
	)
}
