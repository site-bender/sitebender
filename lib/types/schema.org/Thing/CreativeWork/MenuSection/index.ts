import type Thing from "../../index.ts"
import type MenuItem from "../../Intangible/MenuItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import { MenuItem as MenuItemComponent } from "../../../../../components/index.tsx"
import { MenuSection as MenuSectionComponent } from "../../../../../components/index.tsx"

export type MenuSectionType = "MenuSection"

export interface MenuSectionProps {
	"@type"?: MenuSectionType
	hasMenuItem?: MenuItem | ReturnType<typeof MenuItemComponent>
	hasMenuSection?: MenuSection | ReturnType<typeof MenuSectionComponent>
}

type MenuSection = Thing & CreativeWorkProps & MenuSectionProps

export default MenuSection
