import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Thing from "../../index.ts"
import type CategoryCode from "../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type Observation from "../../Intangible/Observation/index.ts"
import type GovernmentService from "../../Intangible/Service/GovernmentService/index.ts"
import type LocalBusiness from "../../Organization/LocalBusiness/index.ts"
import type CivicStructure from "../../Place/CivicStructure/index.ts"
import type DataFeed from "../Dataset/DataFeed/index.ts"
import type Dataset from "../Dataset/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type WebContent from "../WebContent/index.ts"

export interface SpecialAnnouncementProps {
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

type SpecialAnnouncement =
	& Thing
	& CreativeWorkProps
	& SpecialAnnouncementProps

export default SpecialAnnouncement
