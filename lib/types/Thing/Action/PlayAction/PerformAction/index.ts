import EntertainmentBusiness from "../../../Organization/LocalBusiness/EntertainmentBusiness/index.ts"
import PlayAction from "../index.ts"

export default interface PerformAction extends PlayAction {
	/** A sub property of location. The entertainment business where the action occurred. */
	entertainmentBusiness?: EntertainmentBusiness
}
