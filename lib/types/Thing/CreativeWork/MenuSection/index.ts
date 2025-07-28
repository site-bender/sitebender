import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MenuItem from "../../Intangible/MenuItem/index.ts"

import MenuSectionComponent from "../../../../../components/Thing/CreativeWork/MenuSection/index.tsx"

export interface MenuSectionProps {
	hasMenuItem?: MenuItem
	hasMenuSection?: MenuSection
}

type MenuSection =
	& Thing
	& CreativeWorkProps
	& MenuSectionProps

export default MenuSection
