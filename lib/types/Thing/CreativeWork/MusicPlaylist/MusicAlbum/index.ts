import MusicAlbumProductionType from "../../../Intangible/Enumeration/MusicAlbumProductionType/index.ts"
import MusicAlbumReleaseType from "../../../Intangible/Enumeration/MusicAlbumReleaseType/index.ts"
import MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import Person from "../../../Person/index.ts"
import MusicPlaylist from "../index.ts"
import MusicRelease from "../MusicRelease/index.ts"

export default interface MusicAlbum extends MusicPlaylist {
	/** Classification of the album by its type of content: soundtrack, live album, studio album, etc. */
	albumProductionType?: MusicAlbumProductionType
	/** A release of this album. */
	albumRelease?: MusicRelease
	/** The kind of release which this album is: single, EP or album. */
	albumReleaseType?: MusicAlbumReleaseType
	/** The artist that performed this album or recording. */
	byArtist?: MusicGroup | Person
}
