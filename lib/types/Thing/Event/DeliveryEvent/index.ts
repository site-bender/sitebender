import { DateTime, Text } from "../../../DataType/index.ts"
import DeliveryMethod from "../../Intangible/Enumeration/DeliveryMethod/index.ts"
import Event from "../index.ts"

export default interface DeliveryEvent extends Event {
	/** Password, PIN, or access code needed for delivery (e.g. from a locker). */
	accessCode?: Text
	/** When the item is available for pickup from the store, locker, etc. */
	availableFrom?: DateTime
	/** After this date, the item will no longer be available for pickup. */
	availableThrough?: DateTime
	/** Method used for delivery or shipping. */
	hasDeliveryMethod?: DeliveryMethod
}
