import MenuItem from "../../Intangible/MenuItem/index.ts"
import CreativeWork from "../index.ts"

export default interface MenuSection extends CreativeWork {
	/** A food or drink item contained in a menu or menu section. */
	hasMenuItem?: MenuItem
	/** A subgrouping of the menu (by dishes, course, serving time period, etc.). */
	hasMenuSection?: MenuSection
}
