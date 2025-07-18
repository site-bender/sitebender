import type { Text, URL } from "../../../DataType/index.ts"
import type DataFeed from "../Dataset/DataFeed/index.ts"
import type CreativeWork from "../index.ts"
import type ImageObject from "../MediaObject/ImageObject/index.ts"

export default interface SoftwareApplication extends CreativeWork {
	/** Type of software application, e.g. 'Game, Multimedia'. */
	applicationCategory?: URL | Text
	/** Subcategory of the application, e.g. 'Arcade Game'. */
	applicationSubCategory?: Text | URL
	/** The name of the application suite to which the application belongs (e.g. Excel belongs to Office). */
	applicationSuite?: Text
	/** Device required to run the application. Used in cases where a specific make/model is required to run the application. */
	availableOnDevice?: Text
	/** Countries for which the application is not supported. You can also provide the two-letter ISO 3166-1 alpha-2 country code. */
	countriesNotSupported?: Text
	/** Countries for which the application is supported. You can also provide the two-letter ISO 3166-1 alpha-2 country code. */
	countriesSupported?: Text
	/** Device required to run the application. Used in cases where a specific make/model is required to run the application. */
	device?: Text
	/** If the file can be downloaded, URL to download the binary. */
	downloadUrl?: URL
	/** Features or modules provided by this application (and possibly required by other applications). */
	featureList?: URL | Text
	/** Size of the application / package (e.g. 18MB). In the absence of a unit (MB, KB etc.), KB will be assumed. */
	fileSize?: Text
	/** URL at which the app may be installed, if different from the URL of the item. */
	installUrl?: URL
	/** Minimum memory requirements. */
	memoryRequirements?: URL | Text
	/** Operating systems supported (Windows 7, OS X 10.6, Android 1.6). */
	operatingSystem?: Text
	/** Permission(s) required to run the app (for example, a mobile app may require full internet access or may run only on wifi). */
	permissions?: Text
	/** Processor architecture required to run the application (e.g. IA64). */
	processorRequirements?: Text
	/** Description of what changed in this version. */
	releaseNotes?: Text | URL
	/** Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (examples: DirectX, Java or .NET runtime). */
	requirements?: URL | Text
	/** A link to a screenshot image of the app. */
	screenshot?: URL | ImageObject
	/** Additional content for a software application. */
	softwareAddOn?: SoftwareApplication
	/** Software application help. */
	softwareHelp?: CreativeWork
	/** Component dependency requirements for application. This includes runtime environments and shared libraries that are not included in the application distribution package, but required to run the application (examples: DirectX, Java or .NET runtime). */
	softwareRequirements?: Text | URL
	/** Version of the software instance. */
	softwareVersion?: Text
	/** Storage requirements (free space required). */
	storageRequirements?: Text | URL
	/** Supporting data for a SoftwareApplication. */
	supportingData?: DataFeed
}
