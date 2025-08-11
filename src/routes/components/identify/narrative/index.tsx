import PageWrapper from "~components/page/PageWrapper/index.tsx"
import ComponentList from "~components/ComponentList/index.tsx"

export default function NarrativePage() {
	const components = [
		// Character Components
		{
			name: "CharacterName",
			description: "Names of characters in fiction",
			example: `<CharacterName characterId="sherlock" displayName="Holmes">
  the detective
</CharacterName>`,
		},
		{
			name: "CharacterRelationship",
			description: "Relationships between characters",
			example: `<CharacterRelationship 
  character1="Elizabeth" 
  character2="Darcy" 
  relationshipType="romantic"
>
  their complicated courtship
</CharacterRelationship>`,
		},
		{
			name: "CharacterRole",
			description: "Roles and archetypes in narrative",
			example: `<CharacterRole role="mentor" character="Gandalf">
  the wise wizard
</CharacterRole>`,
		},
		{
			name: "Protagonist",
			description: "Main character or hero",
			example: `<Protagonist characterName="Frodo">
  the unlikely hero
</Protagonist>`,
		},
		{
			name: "Antagonist",
			description: "Opposing character or force",
			example: `<Antagonist characterName="Sauron" antagonistType="villain">
  the dark lord
</Antagonist>`,
		},
		{
			name: "SideCharacter",
			description: "Secondary characters",
			example: `<SideCharacter 
  characterName="Sam" 
  role="companion"
  importance="major"
>
  the loyal gardener
</SideCharacter>`,
		},
		// Narrative Structure
		{
			name: "Dialogue",
			description: "Spoken dialogue in narratives",
			example: `<Dialogue speaker="Alice" tone="curious">
  "But how can you talk without a body?"
</Dialogue>`,
		},
		{
			name: "InternalMonologue",
			description: "Character thoughts and self-dialogue",
			example: `<InternalMonologue character="Hamlet" mood="contemplative">
  To be, or not to be, that is the question...
</InternalMonologue>`,
		},
		{
			name: "Narration",
			description: "Narrative text and description",
			example: `<Narration voice="third-person" tense="past">
  The sun set slowly over the distant mountains.
</Narration>`,
		},
		{
			name: "StageDirection",
			description: "Stage directions in plays/scripts",
			example: `<StageDirection intensity="dramatic">
  (Thunder crashes. Enter MACBETH, dagger in hand.)
</StageDirection>`,
		},
		{
			name: "SceneSetting",
			description: "Scene locations and settings",
			example: `<SceneSetting location="Baker Street" time="evening">
  The study was dimly lit by gaslight
</SceneSetting>`,
		},
		{
			name: "Flashback",
			description: "Flashback sequences (wrapper)",
			example: `<Flashback timeShift="10 years earlier" trigger="memory">
  <p>She remembered the summer when everything changed...</p>
</Flashback>`,
		},
		{
			name: "Foreshadowing",
			description: "Hints about future events",
			example: `<Foreshadowing 
  intensity="subtle" 
  foreshadows="betrayal"
>
  He smiled a little too eagerly
</Foreshadowing>`,
		},
		// Narrative Techniques
		{
			name: "Metafiction",
			description: "Self-referential narrative",
			example: `<Metafiction metaType="author-intrusion">
  Dear reader, you may wonder why I'm telling you this...
</Metafiction>`,
		},
		{
			name: "NonlinearNarrative",
			description: "Non-linear storytelling",
			example: `<NonlinearNarrative structure="parallel" timeline="past">
  <p>Meanwhile, twenty years earlier...</p>
</NonlinearNarrative>`,
		},
		{
			name: "PointOfView",
			description: "Narrative perspective",
			example: `<PointOfView perspective="first-person" narrator="Scout">
  I never thought I'd see the day when...
</PointOfView>`,
		},
		{
			name: "Setting",
			description: "Time and place description",
			example: `<Setting 
  location="Victorian London" 
  timePeriod="1888" 
  atmosphere="foggy"
>
  The gas lamps flickered in the dense fog
</Setting>`,
		},
		{
			name: "Symbolism",
			description: "Symbolic representations",
			example: `<Symbolism represents="hope" symbolType="metaphor">
  The single green shoot pushing through concrete
</Symbolism>`,
		},
		{
			name: "VoiceOver",
			description: "Narration/commentary overlay",
			example: `<VoiceOver narrator="Older Scout" timing="retrospective">
  Looking back now, I realize we never really understood him.
</VoiceOver>`,
		},
	]

	return (
		<PageWrapper route="/components/identify/narrative">
			<h1>Narrative Components</h1>
			<p>
				Components for identifying and marking narrative elements in text,
				including character relationships, story structure, and narrative techniques.
			</p>
			<ComponentList components={components} basePath="identify/narrative" />
		</PageWrapper>
	)
}