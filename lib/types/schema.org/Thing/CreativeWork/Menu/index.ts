import type Thing from "../../index.ts"
import type MenuItem from "../../Intangible/MenuItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MenuSection from "../MenuSection/index.ts"

import { MenuItem as MenuItemComponent } from "../../../../../components/index.tsx"
import { MenuSection as MenuSectionComponent } from "../../../../../components/index.tsx"

export type MenuType = "Menu"

export interface MenuProps {
	"@type"?: MenuType
	hasMenuItem?: MenuItem | ReturnType<typeof MenuItemComponent>
	hasMenuSection?: MenuSection | ReturnType<typeof MenuSectionComponent>
}

type Menu = Thing & CreativeWorkProps & MenuProps

export default Menu
