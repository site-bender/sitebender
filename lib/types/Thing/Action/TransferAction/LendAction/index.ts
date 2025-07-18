import type Person from "../../../Person/index.ts"
import type TransferAction from "../index.ts"

export default interface LendAction extends TransferAction {
	/** A sub property of participant. The person that borrows the object being lent. */
	borrower?: Person
}
