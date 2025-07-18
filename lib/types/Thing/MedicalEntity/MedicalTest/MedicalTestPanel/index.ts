import type MedicalTest from "../index.ts"

export default interface MedicalTestPanel extends MedicalTest {
	/** A component test of the panel. */
	subTest?: MedicalTest
}
