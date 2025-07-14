import Organization from "../../../../Organization/index.ts"
import Person from "../../../../Person/index.ts"
import ReactAction from "../index.ts"

export default interface EndorseAction extends ReactAction {
	/** A sub property of participant. The person/organization being supported. */
	endorsee?: Organization | Person
}
