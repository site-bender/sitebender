import type Thing from "../../index.ts"
import type MenuItem from "../../Intangible/MenuItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MenuSection from "../MenuSection/index.ts"

export interface MenuProps {
	/** A food or drink item contained in a menu or menu section. */
	hasMenuItem?: MenuItem
	/** A subgrouping of the menu (by dishes, course, serving time period, etc.). */
	hasMenuSection?: MenuSection
}

type Menu =
	& Thing
	& CreativeWorkProps
	& MenuProps

export default Menu
