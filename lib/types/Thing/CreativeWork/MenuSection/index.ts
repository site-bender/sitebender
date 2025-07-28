import type Thing from "../../index.ts"
import type MenuItem from "../../Intangible/MenuItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import MenuSectionComponent from "../../../../components/Thing/CreativeWork/MenuSection/index.ts"
import MenuItemComponent from "../../../../components/Thing/Intangible/MenuItem/index.ts"

export interface MenuSectionProps {
	hasMenuItem?: MenuItem | ReturnType<typeof MenuItemComponent>
	hasMenuSection?: MenuSection | ReturnType<typeof MenuSectionComponent>
}

type MenuSection = Thing & CreativeWorkProps & MenuSectionProps

export default MenuSection
