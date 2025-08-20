import Antagonist from "~lib/components/identify/narrative/Antagonist/index.tsx"
import CharacterName from "~lib/components/identify/narrative/CharacterName/index.tsx"
import CharacterRelationship from "~lib/components/identify/narrative/CharacterRelationship/index.tsx"
import CharacterRole from "~lib/components/identify/narrative/CharacterRole/index.tsx"
import Dialogue from "~lib/components/identify/narrative/Dialogue/index.tsx"
import Flashback from "~lib/components/identify/narrative/Flashback/index.tsx"
import Foreshadowing from "~lib/components/identify/narrative/Foreshadowing/index.tsx"
import InternalMonologue from "~lib/components/identify/narrative/InternalMonologue/index.tsx"
import Narration from "~lib/components/identify/narrative/Narration/index.tsx"
import Protagonist from "~lib/components/identify/narrative/Protagonist/index.tsx"
import SceneSetting from "~lib/components/identify/narrative/SceneSetting/index.tsx"
import SideCharacter from "~lib/components/identify/narrative/SideCharacter/index.tsx"
import StageDirection from "~lib/components/identify/narrative/StageDirection/index.tsx"

export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Narrative Components - Identity Components</title>
			<meta
				name="description"
				content="Components for identifying and marking up characters, relationships, and narrative elements in text."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<main>
			<h1>Narrative Components</h1>
			<p>
				Components for identifying characters, relationships, and narrative
				elements in text. These components support progressive enhancement with
				optional Schema.org enrichment.
			</p>

			<section>
				<h2>CharacterName</h2>
				<p>
					Marks up character names with support for full names, nicknames,
					titles, and character IDs for linking multiple references.
				</p>

				<dl>
					<dt>Simple character name (no enrichment)</dt>
					<dd>
						<CharacterName>Elizabeth Bennet</CharacterName>
					</dd>

					<dt>Character with nickname and ID</dt>
					<dd>
						<CharacterName
							characterId="elizabeth-bennet"
							fullName="Elizabeth Bennet"
							nickname="Lizzy"
						>
							Lizzy
						</CharacterName>
					</dd>

					<dt>Character with microdata enrichment</dt>
					<dd>
						<CharacterName
							characterId="mr-darcy"
							fullName="Fitzwilliam Darcy"
							title="Mr."
							role="romantic-lead"
							enrich="microdata"
						>
							Mr. Darcy
						</CharacterName>
					</dd>

					<dt>Character with linked data enrichment</dt>
					<dd>
						<CharacterName
							characterId="jane-bennet"
							fullName="Jane Bennet"
							enrich="linkedData"
						>
							Jane
						</CharacterName>
					</dd>

					<dt>Character with both microdata and linked data</dt>
					<dd>
						<CharacterName
							characterId="mr-bingley"
							fullName="Charles Bingley"
							title="Mr."
							enrich="both"
						>
							Mr. Bingley
						</CharacterName>
					</dd>

					<dt>Character with strong emphasis</dt>
					<dd>
						<CharacterName
							characterId="lady-catherine"
							fullName="Lady Catherine de Bourgh"
							element="strong"
						>
							Lady Catherine
						</CharacterName>
					</dd>
				</dl>
			</section>

			<section>
				<h2>CharacterRelationship</h2>
				<p>
					Marks up relationships between characters with support for different
					relationship types and statuses.
				</p>

				<dl>
					<dt>Simple sibling relationship</dt>
					<dd>
						Elizabeth looked at{" "}
						<CharacterRelationship
							from="elizabeth-bennet"
							to="jane-bennet"
							type="sibling"
						>
							her sister Jane
						</CharacterRelationship>
						.
					</dd>

					<dt>Romantic relationship with status</dt>
					<dd>
						Mr. Darcy thought of{" "}
						<CharacterRelationship
							from="mr-darcy"
							to="elizabeth-bennet"
							type="romantic"
							status="eventual"
						>
							his future wife
						</CharacterRelationship>
						.
					</dd>

					<dt>Mutual friendship with enrichment</dt>
					<dd>
						Charlotte Lucas,{" "}
						<CharacterRelationship
							from="charlotte"
							to="elizabeth-bennet"
							type="friendship"
							reciprocal={true}
							enrich="microdata"
						>
							Elizabeth's dearest friend
						</CharacterRelationship>
						, arrived early.
					</dd>

					<dt>Adversarial relationship</dt>
					<dd>
						<CharacterRelationship
							from="elizabeth-bennet"
							to="mr-wickham"
							type="adversarial"
							status="former"
							element="em"
						>
							The deceitful Wickham
						</CharacterRelationship>{" "}
						had fled town.
					</dd>
				</dl>
			</section>

			<section>
				<h2>CharacterRole</h2>
				<p>
					Identifies narrative functions and archetypal patterns that characters
					fulfill.
				</p>

				<dl>
					<dt>Mentor archetype</dt>
					<dd>
						<CharacterRole
							characterId="gandalf"
							archetype="mentor"
						>
							The wise Gandalf
						</CharacterRole>{" "}
						guided them forward.
					</dd>

					<dt>Deuteragonist with enrichment</dt>
					<dd>
						<CharacterRole
							characterId="samwise"
							archetype="companion"
							function="deuteragonist"
							importance="major"
							enrich="both"
						>
							Sam
						</CharacterRole>{" "}
						never left Frodo's side.
					</dd>

					<dt>Shapeshifter archetype</dt>
					<dd>
						<CharacterRole
							characterId="snape"
							archetype="shapeshifter"
							function="support"
							element="mark"
						>
							Professor Snape
						</CharacterRole>
						's true loyalties remained hidden.
					</dd>

					<dt>Minor foil character</dt>
					<dd>
						<CharacterRole
							characterId="mr-collins"
							function="foil"
							importance="minor"
						>
							Mr. Collins
						</CharacterRole>{" "}
						provided comic relief.
					</dd>
				</dl>
			</section>

			<section>
				<h2>Protagonist</h2>
				<p>
					Specialized component for main characters with hero's journey stages
					and character arc tracking.
				</p>

				<dl>
					<dt>Simple protagonist</dt>
					<dd>
						<Protagonist>Luke Skywalker</Protagonist> faced his destiny.
					</dd>

					<dt>Protagonist at specific journey stage</dt>
					<dd>
						<Protagonist
							characterId="frodo"
							journeyStage="return"
						>
							Frodo
						</Protagonist>{" "}
						finally reached the Shire.
					</dd>

					<dt>Co-protagonist with growth arc</dt>
					<dd>
						<Protagonist
							characterId="elizabeth-bennet"
							arcType="growth"
							multiProtagonist={true}
							enrich="microdata"
						>
							Elizabeth
						</Protagonist>{" "}
						and{" "}
						<Protagonist
							characterId="mr-darcy"
							arcType="transformation"
							multiProtagonist={true}
							enrich="microdata"
						>
							Darcy
						</Protagonist>{" "}
						both learned from their prejudices.
					</dd>

					<dt>Tragic protagonist with fall arc</dt>
					<dd>
						<Protagonist
							characterId="macbeth"
							arcType="fall"
							journeyStage="ordeal"
							element="strong"
							enrich="both"
						>
							Macbeth
						</Protagonist>{" "}
						descended into madness.
					</dd>
				</dl>
			</section>

			<section>
				<h2>Antagonist</h2>
				<p>
					Marks up opposing forces with support for different antagonist types
					and motivations.
				</p>

				<dl>
					<dt>Simple character antagonist</dt>
					<dd>
						<Antagonist>Darth Vader</Antagonist> pursued them relentlessly.
					</dd>

					<dt>Antagonist with motivation</dt>
					<dd>
						<Antagonist
							characterId="sauron"
							type="force"
							motivation="power"
						>
							The Dark Lord
						</Antagonist>{" "}
						sought dominion over all.
					</dd>

					<dt>Redeemable antagonist with enrichment</dt>
					<dd>
						<Antagonist
							characterId="severus-snape"
							motivation="revenge"
							redeemable={true}
							enrich="both"
						>
							Severus Snape
						</Antagonist>{" "}
						concealed his true intentions.
					</dd>

					<dt>Societal antagonist</dt>
					<dd>
						<Antagonist
							characterId="society"
							type="society"
							motivation="tradition"
							element="em"
						>
							The rigid social conventions of Victorian England
						</Antagonist>{" "}
						constrained her choices.
					</dd>

					<dt>Nature as antagonist</dt>
					<dd>
						<Antagonist
							type="nature"
							motivation="survival"
						>
							The merciless winter
						</Antagonist>{" "}
						threatened their expedition.
					</dd>
				</dl>
			</section>

			<section>
				<h2>SideCharacter</h2>
				<p>
					Supporting characters with specific narrative functions and presence
					tracking.
				</p>

				<dl>
					<dt>Simple side character</dt>
					<dd>
						<SideCharacter>Ron Weasley</SideCharacter> joined the adventure.
					</dd>

					<dt>Comic relief character</dt>
					<dd>
						<SideCharacter
							characterId="mercutio"
							function="comic-relief"
							fate="dies"
						>
							Mercutio
						</SideCharacter>{" "}
						lightened the mood with his wit.
					</dd>

					<dt>Love interest with enrichment</dt>
					<dd>
						<SideCharacter
							characterId="jane-bennet"
							function="love-interest"
							presence="recurring"
							fate="survives"
							enrich="microdata"
						>
							Jane
						</SideCharacter>{" "}
						captured Bingley's heart.
					</dd>

					<dt>Occasional mentor figure</dt>
					<dd>
						<SideCharacter
							characterId="mr-bennet"
							function="voice-of-reason"
							presence="occasional"
							element="mark"
						>
							Mr. Bennet
						</SideCharacter>{" "}
						offered sardonic wisdom.
					</dd>

					<dt>Single-scene catalyst</dt>
					<dd>
						<SideCharacter
							characterId="mysterious-stranger"
							function="catalyst"
							presence="single-scene"
							fate="unknown"
							enrich="both"
						>
							The mysterious stranger
						</SideCharacter>{" "}
						delivered the crucial message and vanished.
					</dd>
				</dl>
			</section>

			<section>
				<h2>Combined Example: Pride and Prejudice Opening</h2>
				<p>
					Here's how multiple narrative components work together to mark up a
					complex passage:
				</p>

				<blockquote>
					<p>
						<Protagonist
							characterId="elizabeth-bennet"
							arcType="growth"
							journeyStage="ordinary-world"
							enrich="microdata"
						>
							Elizabeth Bennet
						</Protagonist>{" "}
						walked through Longbourn, thinking of{" "}
						<CharacterRelationship
							from="elizabeth-bennet"
							to="jane-bennet"
							type="sibling"
							reciprocal={true}
						>
							her dear sister Jane
						</CharacterRelationship>
						's happiness with{" "}
						<SideCharacter
							characterId="mr-bingley"
							function="love-interest"
							presence="recurring"
						>
							Mr. Bingley
						</SideCharacter>
						. She could not help but contrast it with her own complicated
						feelings toward{" "}
						<Protagonist
							characterId="mr-darcy"
							arcType="transformation"
							multiProtagonist={true}
							journeyStage="trials"
							enrich="microdata"
						>
							Mr. Darcy
						</Protagonist>
						, who had transformed from{" "}
						<CharacterRole
							characterId="mr-darcy"
							function="antagonist"
							archetype="shadow"
						>
							proud antagonist
						</CharacterRole>{" "}
						to something quite different.
					</p>
					<p>
						Meanwhile,{" "}
						<Antagonist
							characterId="mr-wickham"
							motivation="greed"
							type="character"
						>
							Wickham
						</Antagonist>{" "}
						had eloped with{" "}
						<SideCharacter
							characterId="lydia-bennet"
							function="catalyst"
							fate="transformed"
						>
							Lydia
						</SideCharacter>
						, causing scandal. Even{" "}
						<SideCharacter
							characterId="lady-catherine"
							function="voice-of-reason"
							presence="occasional"
						>
							Lady Catherine de Bourgh
						</SideCharacter>
						, despite her{" "}
						<Antagonist
							type="society"
							motivation="tradition"
						>
							rigid adherence to social hierarchy
						</Antagonist>
						, could not prevent the union of two hearts truly in love.
					</p>
				</blockquote>
			</section>

			<section>
				<h2>Element Variations</h2>
				<p>
					All narrative components support different HTML elements for semantic
					emphasis:
				</p>

				<dl>
					<dt>Default span</dt>
					<dd>
						<CharacterName element="span">Default Character</CharacterName>
					</dd>

					<dt>Bold emphasis</dt>
					<dd>
						<CharacterName element="b">Bold Character</CharacterName>
					</dd>

					<dt>Strong importance</dt>
					<dd>
						<CharacterName element="strong">Strong Character</CharacterName>
					</dd>

					<dt>Highlighted/marked</dt>
					<dd>
						<CharacterName element="mark">Marked Character</CharacterName>
					</dd>

					<dt>Citation context</dt>
					<dd>
						<CharacterName element="cite">Cited Character</CharacterName>
					</dd>
				</dl>
			</section>

			<section>
				<h2>Dialogue</h2>
				<p>
					Marks up spoken dialogue with speaker attribution and tone. Supports
					both inline and block-level dialogue.
				</p>

				<dl>
					<dt>Simple dialogue</dt>
					<dd>
						<Dialogue>"Hello," she said.</Dialogue>
					</dd>

					<dt>Dialogue with speaker</dt>
					<dd>
						<Dialogue
							speaker="Elizabeth Bennet"
							speakerId="elizabeth"
						>
							"I am perfectly convinced that Mr. Darcy has no defect."
						</Dialogue>
					</dd>

					<dt>Dialogue with tone and enrichment</dt>
					<dd>
						<Dialogue
							speaker="Mr. Darcy"
							speakerId="darcy"
							tone="serious"
							element="blockquote"
							enrich="microdata"
						>
							"My good opinion once lost is lost forever."
						</Dialogue>
					</dd>

					<dt>Internal dialogue (thought)</dt>
					<dd>
						<Dialogue
							internal={true}
							speaker="Elizabeth"
							tone="sarcastic"
						>
							Oh yes, he's absolutely perfect
						</Dialogue>
					</dd>
				</dl>
			</section>

			<section>
				<h2>InternalMonologue</h2>
				<p>
					Marks up character thoughts and stream of consciousness, representing
					unspoken internal reflections.
				</p>

				<dl>
					<dt>Simple internal thought</dt>
					<dd>
						<InternalMonologue>
							What was I thinking?
						</InternalMonologue>
					</dd>

					<dt>Internal monologue with character</dt>
					<dd>
						<InternalMonologue
							characterId="elizabeth"
							character="Elizabeth Bennet"
							mood="regretful"
						>
							How could I have been so blind to his true nature?
						</InternalMonologue>
					</dd>

					<dt>Stream of consciousness</dt>
					<dd>
						<InternalMonologue
							characterId="molly-bloom"
							character="Molly Bloom"
							style="stream-of-consciousness"
							element="div"
							enrich="both"
						>
							yes and his heart was going like mad and yes I said yes I will Yes
						</InternalMonologue>
					</dd>
				</dl>
			</section>

			<section>
				<h2>Narration</h2>
				<p>
					Marks up narrative text that is neither dialogue nor stage direction,
					including descriptive passages and the narrator's voice.
				</p>

				<dl>
					<dt>Simple narration</dt>
					<dd>
						<Narration>
							The sun set slowly over the horizon.
						</Narration>
					</dd>

					<dt>Third-person omniscient</dt>
					<dd>
						<Narration
							perspective="third-person"
							narratorType="omniscient"
						>
							Little did she know that her life was about to change forever.
						</Narration>
					</dd>

					<dt>First-person narration with narrator</dt>
					<dd>
						<Narration
							perspective="first-person"
							narratorId="nick-carraway"
							narrator="Nick Carraway"
							style="reflective"
							element="div"
							enrich="both"
						>
							In my younger and more vulnerable years my father gave me some
							advice that I've been turning over in my mind ever since.
						</Narration>
					</dd>
				</dl>
			</section>

			<section>
				<h2>StageDirection</h2>
				<p>
					Marks up stage directions and production notes in plays and scripts,
					including entrances, exits, and technical directions.
				</p>

				<dl>
					<dt>Simple stage direction</dt>
					<dd>
						<StageDirection>Enter stage left</StageDirection>
					</dd>

					<dt>Character entrance</dt>
					<dd>
						<StageDirection
							type="entrance"
							characterId="hamlet"
						>
							HAMLET enters, reading a book
						</StageDirection>
					</dd>

					<dt>Character action</dt>
					<dd>
						<StageDirection
							type="action"
							characterId="juliet"
							element="div"
							enrich="microdata"
						>
							She drinks the potion and falls upon her bed
						</StageDirection>
					</dd>

					<dt>Technical direction</dt>
					<dd>
						<StageDirection
							type="technical"
							category="lighting"
						>
							Lights dim to blackout
						</StageDirection>
					</dd>
				</dl>
			</section>

			<section>
				<h2>SceneSetting</h2>
				<p>
					Marks up the setting or location of a scene, including physical
					locations, time periods, and atmosphere.
				</p>

				<dl>
					<dt>Simple setting</dt>
					<dd>
						<SceneSetting>A dark forest</SceneSetting>
					</dd>

					<dt>Detailed setting with time and place</dt>
					<dd>
						<SceneSetting
							location="Longbourn estate"
							time="morning"
							period="Regency England"
						>
							The drawing room at Longbourn, early morning
						</SceneSetting>
					</dd>

					<dt>Screenplay format with enrichment</dt>
					<dd>
						<SceneSetting
							location="Death Star"
							atmosphere="tense"
							interiorExterior="interior"
							element="div"
							enrich="both"
						>
							INT. DEATH STAR - THRONE ROOM - DAY
						</SceneSetting>
					</dd>
				</dl>
			</section>

			<section>
				<h2>Flashback</h2>
				<p>
					Wraps flashback sequences to mark temporal shifts to earlier events.
					The wrapper approach ensures proper structure and clear boundaries.
				</p>

				<dl>
					<dt>Simple flashback</dt>
					<dd>
						<Flashback>
							She remembered the day they first met...
						</Flashback>
					</dd>

					<dt>Flashback with time shift and trigger</dt>
					<dd>
						<Flashback
							timeShift="10 years earlier"
							trigger="photograph"
						>
							<p>The summer of 1962 had been uncommonly hot.</p>
							<p>Young Sarah ran through the sprinklers...</p>
						</Flashback>
					</dd>

					<dt>Complex flashback with nested components</dt>
					<dd>
						<Flashback
							timeShift="childhood"
							trigger="smell"
							transitionStyle="dissolve"
							element="aside"
							enrich="both"
						>
							<SceneSetting
								location="Grandmother's kitchen"
								time="afternoon"
								period="1975"
							>
								Her grandmother's kitchen, 1975
							</SceneSetting>
							<Narration>
								The aroma of fresh-baked cookies filled the air...
							</Narration>
							<Dialogue speaker="Grandmother">
								"Come help me with these cookies, dear."
							</Dialogue>
						</Flashback>
					</dd>
				</dl>
			</section>

			<section>
				<h2>Foreshadowing</h2>
				<p>
					Marks up hints and clues about future events in the narrative, helping
					readers identify predictive elements.
				</p>

				<dl>
					<dt>Simple foreshadowing</dt>
					<dd>
						<Foreshadowing>
							Little did she know how important that key would become.
						</Foreshadowing>
					</dd>

					<dt>Subtle symbolic foreshadowing</dt>
					<dd>
						<Foreshadowing
							type="symbolic"
							subtlety="subtle"
						>
							The storm clouds gathered on the horizon.
						</Foreshadowing>
					</dd>

					<dt>Obvious dialogue foreshadowing</dt>
					<dd>
						<Foreshadowing
							type="dialogue"
							subtlety="obvious"
							element="div"
							enrich="both"
						>
							"Be careful what you wish for," the old woman warned.
						</Foreshadowing>
					</dd>

					<dt>Chekhov's gun</dt>
					<dd>
						<Foreshadowing
							type="chekhov-gun"
							subtlety="moderate"
						>
							Above the mantelpiece hung an old hunting rifle.
						</Foreshadowing>
					</dd>
				</dl>
			</section>

			<section>
				<h2>Technical Notes</h2>
				<ul>
					<li>
						All components include data-* attributes for CSS styling and
						JavaScript enhancement
					</li>
					<li>
						ARIA labels provide accessibility for screen readers
					</li>
					<li>
						The <code>enrich</code> prop controls Schema.org metadata:
						<ul>
							<li>
								<code>undefined</code>{" "}
								(default): Lightweight with data attributes only
							</li>
							<li>
								<code>"microdata"</code>: Adds Schema.org microdata
							</li>
							<li>
								<code>"linkedData"</code>: Adds JSON-LD structured data
							</li>
							<li>
								<code>"both"</code>: Includes both microdata and JSON-LD
							</li>
						</ul>
					</li>
					<li>
						Components can be nested and combined for rich narrative markup
					</li>
					<li>
						Character IDs enable linking multiple references to the same
						character
					</li>
				</ul>
			</section>
		</main>
	)
}
