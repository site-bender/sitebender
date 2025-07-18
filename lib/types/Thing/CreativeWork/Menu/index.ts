import type MenuItem from "../../Intangible/MenuItem/index.ts"
import type CreativeWork from "../index.ts"
import type MenuSection from "../MenuSection/index.ts"

export default interface Menu extends CreativeWork {
	/** A food or drink item contained in a menu or menu section. */
	hasMenuItem?: MenuItem
	/** A subgrouping of the menu (by dishes, course, serving time period, etc.). */
	hasMenuSection?: MenuSection
}
