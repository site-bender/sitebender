import { Boolean, Text, URL } from "../../../../DataType/index.ts"
import Menu from "../../../CreativeWork/Menu/index.ts"
import Rating from "../../../Intangible/Rating/index.ts"
import LocalBusiness from "../index.ts"

export default interface FoodEstablishment extends LocalBusiness {
	/** Indicates whether a FoodEstablishment accepts reservations. Values can be Boolean, an URL at which reservations can be made or (for backwards compatibility) the strings ```Yes``` or ```No```. */
	acceptsReservations?: Boolean | Text | URL
	/** Either the actual menu as a structured representation, as text, or a URL of the menu. */
	hasMenu?: Menu | Text | URL
	/** Either the actual menu as a structured representation, as text, or a URL of the menu. */
	menu?: Text | URL | Menu
	/** The cuisine of the restaurant. */
	servesCuisine?: Text
	/** An official rating for a lodging business or food establishment, e.g. from national associations or standards bodies. Use the author property to indicate the rating organization, e.g. as an Organization with name such as (e.g. HOTREC, DEHOGA, WHR, or Hotelstars). */
	starRating?: Rating
}
