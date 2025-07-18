import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type InteractAction from "../index.ts"

export default interface FollowAction extends InteractAction {
	/** A sub property of object. The person or organization being followed. */
	followee?: Person | Organization
}
