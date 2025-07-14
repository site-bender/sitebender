import { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import Thing from "../../../index.ts"
import CategoryCode from "../../Intangible/DefinedTerm/CategoryCode/index.ts"
import PhysicalActivityCategory from "../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import Observation from "../../Intangible/Observation/index.ts"
import GovernmentService from "../../Intangible/Service/GovernmentService/index.ts"
import LocalBusiness from "../../Organization/LocalBusiness/index.ts"
import CivicStructure from "../../Place/CivicStructure/index.ts"
import DataFeed from "../Dataset/DataFeed/index.ts"
import Dataset from "../Dataset/index.ts"
import CreativeWork from "../index.ts"
import WebContent from "../WebContent/index.ts"

export default interface SpecialAnnouncement extends CreativeWork {
	/** Indicates a specific [[CivicStructure]] or [[LocalBusiness]] associated with the SpecialAnnouncement. For example, a specific testing facility or business with special opening hours. For a larger geographic region like a quarantine of an entire region, use [[spatialCoverage]]. */
	announcementLocation?: LocalBusiness | CivicStructure
	/** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
	category?: Thing | PhysicalActivityCategory | Text | URL | CategoryCode
	/** Publication date of an online listing. */
	datePosted?: Date | DateTime
	/** Information about disease prevention. */
	diseasePreventionInfo?: URL | WebContent
	/** Statistical information about the spread of a disease, either as [[WebContent]], or   described directly as a [[Dataset]], or the specific [[Observation]]s in the dataset. When a [[WebContent]] URL is   provided, the page indicated might also contain more such markup. */
	diseaseSpreadStatistics?: URL | Observation | Dataset | WebContent
	/** Information about getting tested (for a [[MedicalCondition]]), e.g. in the context of a pandemic. */
	gettingTestedInfo?: URL | WebContent
	/** governmentBenefitsInfo provides information about government benefits associated with a SpecialAnnouncement. */
	governmentBenefitsInfo?: GovernmentService
	/** Indicates a page with news updates and guidelines. This could often be (but is not required to be) the main page containing [[SpecialAnnouncement]] markup on a site. */
	newsUpdatesAndGuidelines?: WebContent | URL
	/** Information about public transport closures. */
	publicTransportClosuresInfo?: WebContent | URL
	/** Guidelines about quarantine rules, e.g. in the context of a pandemic. */
	quarantineGuidelines?: WebContent | URL
	/** Information about school closures. */
	schoolClosuresInfo?: URL | WebContent
	/** Information about travel bans, e.g. in the context of a pandemic. */
	travelBans?: WebContent | URL
	/** The URL for a feed, e.g. associated with a podcast series, blog, or series of date-stamped updates. This is usually RSS or Atom. */
	webFeed?: URL | DataFeed
}
