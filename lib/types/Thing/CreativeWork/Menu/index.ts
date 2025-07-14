import MenuItem from "../../Intangible/MenuItem/index.ts"
import CreativeWork from "../index.ts"
import MenuSection from "../MenuSection/index.ts"

export default interface Menu extends CreativeWork {
	/** A food or drink item contained in a menu or menu section. */
	hasMenuItem?: MenuItem
	/** A subgrouping of the menu (by dishes, course, serving time period, etc.). */
	hasMenuSection?: MenuSection
}
