import MedicalImagingTechnique from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalImagingTechnique/index.ts"
import MedicalTest from "../index.ts"

export default interface ImagingTest extends MedicalTest {
	/** Imaging technique used. */
	imagingTechnique?: MedicalImagingTechnique
}
