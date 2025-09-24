import type Thing from "../../index.ts"
import type MenuItem from "../../Intangible/MenuItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import MenuSectionComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/MenuSection/index.tsx"
import MenuItemComponent from "../../../../../../codewright/src/define/Thing/Intangible/MenuItem/index.tsx"

export type MenuSectionType = "MenuSection"

export interface MenuSectionProps {
	"@type"?: MenuSectionType
	hasMenuItem?: MenuItem | ReturnType<typeof MenuItemComponent>
	hasMenuSection?: MenuSection | ReturnType<typeof MenuSectionComponent>
}

type MenuSection = Thing & CreativeWorkProps & MenuSectionProps

export default MenuSection
