import { Text } from "../../../DataType/index.ts"
import BlogPosting from "../Article/SocialMediaPosting/BlogPosting/index.ts"
import CreativeWork from "../index.ts"

export default interface Blog extends CreativeWork {
	/** A posting that is part of this blog. */
	blogPost?: BlogPosting
	/** Indicates a post that is part of a [[Blog]]. Note that historically, what we term a "Blog" was once known as a "weblog", and that what we term a "BlogPosting" is now often colloquially referred to as a "blog". */
	blogPosts?: BlogPosting
	/** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
	issn?: Text
}
