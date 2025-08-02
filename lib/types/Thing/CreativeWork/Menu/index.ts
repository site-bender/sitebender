import type Thing from "../../index.ts"
import type MenuItem from "../../Intangible/MenuItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MenuSection from "../MenuSection/index.ts"

import MenuSectionComponent from "../../../../components/Thing/CreativeWork/MenuSection/index.ts"
import MenuItemComponent from "../../../../components/Thing/Intangible/MenuItem/index.ts"

export type MenuType = "Menu"

export interface MenuProps {
	"@type"?: MenuType
	hasMenuItem?: MenuItem | ReturnType<typeof MenuItemComponent>
	hasMenuSection?: MenuSection | ReturnType<typeof MenuSectionComponent>
}

type Menu = Thing & CreativeWorkProps & MenuProps

export default Menu
