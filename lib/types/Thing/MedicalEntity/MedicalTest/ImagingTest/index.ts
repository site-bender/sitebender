import type MedicalImagingTechnique from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.ts"
import type MedicalTest from "../index.ts"

export default interface ImagingTest extends MedicalTest {
	/** Imaging technique used. */
	imagingTechnique?: MedicalImagingTechnique
}
