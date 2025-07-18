import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type MenuSectionProps from "../../../../types/Thing/MenuSection/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MenuSectionProps,
	"MenuSection",
	ExtractLevelProps<MenuSectionProps, CreativeWorkProps>
>

export default function MenuSection(
	{
		hasMenuItem,
		hasMenuSection,
		schemaType = "MenuSection",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasMenuItem,
				hasMenuSection,
				...subtypeProperties,
			}}
		/>
	)
}
