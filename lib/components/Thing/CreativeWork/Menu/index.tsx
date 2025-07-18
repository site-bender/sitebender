import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type MenuProps from "../../../../types/Thing/Menu/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MenuProps,
	"Menu",
	ExtractLevelProps<MenuProps, CreativeWorkProps>
>

export default function Menu(
	{
		hasMenuItem,
		hasMenuSection,
		schemaType = "Menu",
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
