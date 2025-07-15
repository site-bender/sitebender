import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type HowToSectionProps from "../../../../../types/Thing/HowToSection/index.ts"
import type ListItemProps from "../../../../../types/Thing/ListItem/index.ts"

import ListItem from "./index.tsx"

export type Props = BaseComponentProps<
	HowToSectionProps,
	"HowToSection",
	ExtractLevelProps<HowToSectionProps, ListItemProps>
>

export default function HowToSection(
	{
		steps,
		schemaType = "HowToSection",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<ListItem
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				steps,
				...subtypeProperties,
			}}
		/>
	)
}
