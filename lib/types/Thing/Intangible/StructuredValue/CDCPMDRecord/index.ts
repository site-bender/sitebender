import { Date, DateTime, Number, Text } from "../../../../DataType/index.ts"
import StructuredValue from "../index.ts"

export default interface CDCPMDRecord extends StructuredValue {
	/** collectiondate - Date for which patient counts are reported. */
	cvdCollectionDate?: Text | DateTime
	/** Name of the County of the NHSN facility that this data record applies to. Use [[cvdFacilityId]] to identify the facility. To provide other details, [[healthcareReportingData]] can be used on a [[Hospital]] entry. */
	cvdFacilityCounty?: Text
	/** Identifier of the NHSN facility that this data record applies to. Use [[cvdFacilityCounty]] to indicate the county. To provide other details, [[healthcareReportingData]] can be used on a [[Hospital]] entry. */
	cvdFacilityId?: Text
	/** numbeds - HOSPITAL INPATIENT BEDS: Inpatient beds, including all staffed, licensed, and overflow (surge) beds used for inpatients. */
	cvdNumBeds?: Number
	/** numbedsocc - HOSPITAL INPATIENT BED OCCUPANCY: Total number of staffed inpatient beds that are occupied. */
	cvdNumBedsOcc?: Number
	/** numc19died - DEATHS: Patients with suspected or confirmed COVID-19 who died in the hospital, ED, or any overflow location. */
	cvdNumC19Died?: Number
	/** numc19hopats - HOSPITAL ONSET: Patients hospitalized in an NHSN inpatient care location with onset of suspected or confirmed COVID-19 14 or more days after hospitalization. */
	cvdNumC19HOPats?: Number
	/** numc19hosppats - HOSPITALIZED: Patients currently hospitalized in an inpatient care location who have suspected or confirmed COVID-19. */
	cvdNumC19HospPats?: Number
	/** numc19mechventpats - HOSPITALIZED and VENTILATED: Patients hospitalized in an NHSN inpatient care location who have suspected or confirmed COVID-19 and are on a mechanical ventilator. */
	cvdNumC19MechVentPats?: Number
	/** numc19ofmechventpats - ED/OVERFLOW and VENTILATED: Patients with suspected or confirmed COVID-19 who are in the ED or any overflow location awaiting an inpatient bed and on a mechanical ventilator. */
	cvdNumC19OFMechVentPats?: Number
	/** numc19overflowpats - ED/OVERFLOW: Patients with suspected or confirmed COVID-19 who are in the ED or any overflow location awaiting an inpatient bed. */
	cvdNumC19OverflowPats?: Number
	/** numicubeds - ICU BEDS: Total number of staffed inpatient intensive care unit (ICU) beds. */
	cvdNumICUBeds?: Number
	/** numicubedsocc - ICU BED OCCUPANCY: Total number of staffed inpatient ICU beds that are occupied. */
	cvdNumICUBedsOcc?: Number
	/** numtotbeds - ALL HOSPITAL BEDS: Total number of all inpatient and outpatient beds, including all staffed, ICU, licensed, and overflow (surge) beds used for inpatients or outpatients. */
	cvdNumTotBeds?: Number
	/** numvent - MECHANICAL VENTILATORS: Total number of ventilators available. */
	cvdNumVent?: Number
	/** numventuse - MECHANICAL VENTILATORS IN USE: Total number of ventilators in use. */
	cvdNumVentUse?: Number
	/** Publication date of an online listing. */
	datePosted?: Date | DateTime
}
