import CreativeWork from "../..//index.ts"
import WebContent from "../../WebContent/index.ts"
import Comment from "../index.ts"

export default interface Answer extends Comment {
	/** A step-by-step or full explanation about Answer. Can outline how this Answer was achieved or contain more broad clarification or statement about it. */
	answerExplanation?: WebContent | Comment
	/** The parent of a question, answer or item in general. Typically used for Q/A discussion threads e.g. a chain of comments with the first comment being an [[Article]] or other [[CreativeWork]]. See also [[comment]] which points from something to a comment about it. */
	parentItem?: Comment | CreativeWork
}
