import type Thing from "../../index.ts"
import type MediaSubscription from "../../Intangible/MediaSubscription/index.ts"
import type Distance from "../../Intangible/Quantity/Distance/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type GeoShape from "../../Intangible/StructuredValue/GeoShape/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Organization from "../../Organization/index.ts"
import type Place from "../../Place/index.ts"
import type NewsArticle from "../Article/NewsArticle/index.ts"
import type Claim from "../Claim/index.ts"
import type CreativeWork from "../index.ts"

export interface MediaObjectProps {
	/** A NewsArticle associated with the Media Object. */
	associatedArticle?: NewsArticle
	/** The bitrate of the media object. */
	bitrate?: Text
	/** File size in (mega/kilo)bytes. */
	contentSize?: Text
	/** Actual bytes of the media object, for example the image file or video file. */
	contentUrl?: URL
	/** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	duration?: QuantitativeValue | Duration
	/** A URL pointing to a player for a specific video. In general, this is the information in the ```src``` element of an ```embed``` tag and should not be the same as the content of the ```loc``` tag. */
	embedUrl?: URL
	/** The CreativeWork encoded by this media object. */
	encodesCreativeWork?: CreativeWork
	/** Media type typically expressed using a MIME format (see [IANA site](http://www.iana.org/assignments/media-types/media-types.xhtml) and [MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)), e.g. application/zip for a SoftwareApplication binary, audio/mpeg for .mp3 etc.  In cases where a [[CreativeWork]] has several media type representations, [[encoding]] can be used to indicate each [[MediaObject]] alongside particular [[encodingFormat]] information.  Unregistered or niche encoding and file formats can be indicated instead via the most appropriate URL, e.g. defining Web page or a Wikipedia/Wikidata entry. */
	encodingFormat?: URL | Text
	/** The endTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to end. For actions that span a period of time, when the action was performed. E.g. John wrote a book from January to *December*. For media, including audio and video, it's the time offset of the end of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
	endTime?: Time | DateTime
	/** The height of the item. */
	height?: Distance | QuantitativeValue
	/** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.\n\nSee also [[eligibleRegion]]. */
	ineligibleRegion?: Place | GeoShape | Text
	/** Used to indicate a specific claim contained, implied, translated or refined from the content of a [[MediaObject]] or other [[CreativeWork]]. The interpreting party can be indicated using [[claimInterpreter]]. */
	interpretedAsClaim?: Claim
	/** Player type required&#x2014;for example, Flash or Silverlight. */
	playerType?: Text
	/** The production company or studio responsible for the item, e.g. series, video game, episode etc. */
	productionCompany?: Organization
	/** The regions where the media is allowed. If not specified, then it's assumed to be allowed everywhere. Specify the countries in [ISO 3166 format](http://en.wikipedia.org/wiki/ISO_3166). */
	regionsAllowed?: Place
	/** Indicates if use of the media require a subscription  (either paid or free). Allowed values are ```true``` or ```false``` (note that an earlier version had 'yes', 'no'). */
	requiresSubscription?: MediaSubscription | Boolean
	/** The [SHA-2](https://en.wikipedia.org/wiki/SHA-2) SHA256 hash of the content of the item. For example, a zero-length input has value 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'. */
	sha256?: Text
	/** The startTime of something. For a reserved event or service (e.g. FoodEstablishmentReservation), the time that it is expected to start. For actions that span a period of time, when the action was performed. E.g. John wrote a book from *January* to December. For media, including audio and video, it's the time offset of the start of a clip within a larger file.\n\nNote that Event uses startDate/endDate instead of startTime/endTime, even when describing dates with times. This situation may be clarified in future revisions. */
	startTime?: DateTime | Time
	/** Date (including time if available) when this media object was uploaded to this site. */
	uploadDate?: Date | DateTime
	/** The width of the item. */
	width?: Distance | QuantitativeValue
}

type MediaObject =
	& Thing
	& MediaObjectProps

export default MediaObject
