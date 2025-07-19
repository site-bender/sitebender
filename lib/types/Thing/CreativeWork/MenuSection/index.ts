import type Thing from "../../index.ts"
import type MenuItem from "../../Intangible/MenuItem/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface MenuSectionProps {
	/** A food or drink item contained in a menu or menu section. */
	hasMenuItem?: MenuItem
	/** A subgrouping of the menu (by dishes, course, serving time period, etc.). */
	hasMenuSection?: MenuSection
}

type MenuSection =
	& Thing
	& CreativeWorkProps
	& MenuSectionProps

export default MenuSection
