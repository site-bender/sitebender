import type Organization from "../../../../Organization/index.ts"
import type Person from "../../../../Person/index.ts"
import type ReactAction from "../index.ts"

export default interface EndorseAction extends ReactAction {
	/** A sub property of participant. The person/organization being supported. */
	endorsee?: Organization | Person
}
