import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type MenuItemProps from "../../../../types/Thing/MenuItem/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	MenuItemProps,
	"MenuItem",
	ExtractLevelProps<MenuItemProps, IntangibleProps>
>

export default function MenuItem(
	{
		menuAddOn,
		nutrition,
		offers,
		suitableForDiet,
		schemaType = "MenuItem",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				menuAddOn,
				nutrition,
				offers,
				suitableForDiet,
				...subtypeProperties,
			}}
		/>
	)
}
