import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MenuItem from "../../Intangible/MenuItem/index.ts"
import type MenuSection from "../MenuSection/index.ts"

import MenuComponent from "../../../../../components/Thing/CreativeWork/Menu/index.tsx"

export interface MenuProps {
	hasMenuItem?: MenuItem
	hasMenuSection?: MenuSection
}

type Menu =
	& Thing
	& CreativeWorkProps
	& MenuProps

export default Menu
