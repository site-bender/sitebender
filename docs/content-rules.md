# Content Rules

Comprehensive content and writing style rules for Sitebender projects.

## Overview

These rules ensure clear, accessible, and professional communication across all Sitebender content, including documentation, user interfaces, component text, and essays. Most rules are derived from Strunk & White's "The Elements of Style" and adapted for technical writing.

---

## Priority 10 Rules (Critical)

### AUDIENCE_AWARENESS_001: Know Your Audience

**Rule:** Know your audience and write for them. Ask 'Who is the intended audience?' if unclear. Generally Sitebender users are not developers - avoid technical jargon unless clearly addressing experts.

**Reason:** Content must match audience knowledge and needs. Technical language excludes non-technical users.

**Consequences:** Wrong audience level creates confusion, exclusion, or condescension.

**Philosophy:** Write for the reader, not the writer.

**Default Audience:** Sitebender end users (designers, hobbyists, laypersons) not enterprise developers.

**Examples:**
- Technical: "Configure the RESTful API endpoint parameters"
- User-friendly: "Set up your connection settings"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_OMIT_NEEDLESS_001: Omit Needless Words

**Rule:** Omit needless words. Delete phrases like 'the fact that', 'in order to', 'for the purpose of'.

**Reason:** Every word should earn its place. Extra words dilute meaning and waste reader's time.

**Consequences:** Verbose writing obscures meaning and tests reader patience.

**Philosophy:** Clarity through economy - no gratuitous words.

**Examples:**
- Verbose: "The fact that she was late is due to the reason that traffic was bad"
- Clear: "She was late because of traffic"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_ACTIVE_VOICE_001: Use Active Voice

**Rule:** Use active voice. 'We decided' not 'It was decided'. 'The committee rejected the proposal' not 'The proposal was rejected'.

**Reason:** Active voice is direct, clear, and assigns responsibility. Shows who does what.

**Consequences:** Passive voice obscures agency and creates wordy, weak sentences.

**Philosophy:** Direct communication - show who acts.

**Examples:**
- Passive: "Mistakes were made" / "The system was updated" / "Errors will be reported"
- Active: "We made mistakes" / "Engineers updated the system" / "The app will report errors"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_CONCRETE_LANGUAGE_001: Use Concrete Language

**Rule:** Use definite, specific, concrete language. 'A period of unfavorable weather' → 'Rain'. 'A considerable amount of' → 'Much'.

**Reason:** Concrete words create clear mental images. Vague language forces readers to guess meaning.

**Consequences:** Abstract language creates confusion and misunderstanding.

**Philosophy:** Precision in language creates precision in thought.

**Examples:**
- Vague: "A period of unfavorable weather" / "A considerable amount of" / "At this point in time"
- Concrete: "Rain" / "Much" / "Now"

**Applies to:** component_text, documentation, essays, user_interface

---

## Priority 9 Rules (Very Important)

### PLAIN_LANGUAGE_LEVEL_001: Write at 8th Grade Level

**Rule:** Write at 8th grade reading level maximum for Sitebender content. Use simple sentences and common words unless technical precision requires complexity.

**Reason:** 8th grade level ensures accessibility for most readers while maintaining precision.

**Consequences:** Complex language excludes users and increases cognitive load.

**Philosophy:** Universal understanding through clear communication.

**Context:** Sitebender targets designers, hobbyists, and laypersons - not enterprise developers.

**Examples:**
- Complex: "Utilize this functionality to accomplish your objective"
- Clear: "Use this feature to reach your goal"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_AVOID_QUALIFIERS_001: Avoid Qualifiers

**Rule:** Avoid qualifiers like 'rather', 'very', 'pretty', 'quite'. Use definite language or choose stronger words.

**Reason:** Qualifiers weaken statements and add vagueness. Strong words stand alone.

**Consequences:** Qualifiers make writing tentative and unconvincing.

**Philosophy:** Confidence in expression - say what you mean clearly.

**Examples:**
- Qualified: "rather difficult" / "very important" / "pretty good" / "quite sure"
- Definite: "difficult" / "crucial" / "excellent" / "certain"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_NOUNS_VERBS_001: Write with Nouns and Verbs

**Rule:** Write with nouns and verbs, not adjectives and adverbs. Strong words carry meaning better than modified weak words.

**Reason:** Nouns and verbs carry the core meaning. Adjectives and adverbs often compensate for weak word choices.

**Consequences:** Over-reliance on modifiers creates wordy, weak writing.

**Philosophy:** Choose strong base words over weak words with modifiers.

**Examples:**
- Weak: "walked very quickly" / "extremely important" / "really good"
- Strong: "rushed" / "critical" / "excellent"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_POSITIVE_FORM_001: Use Positive Form

**Rule:** Use positive form. Tell what IS, not what ISN'T. 'He usually came late' not 'He was not very often on time'.

**Reason:** Positive statements are clearer and more direct. Easier to understand what actually happens.

**Consequences:** Negative forms require mental processing to understand the actual situation.

**Philosophy:** Direct communication - state reality clearly.

**Examples:**
- Negative: "He was not very often on time" / "The report is not available" / "This feature is not supported"
- Positive: "He usually came late" / "The report is unavailable" / "This feature is unsupported"

**Applies to:** component_text, documentation, essays, user_interface

---

### MURDER_DARLINGS_001: Murder Your Darlings

**Rule:** Murder your darlings - cut beautiful prose that doesn't serve the purpose. Personal attachment to clever writing shouldn't override clarity and goal.

**Reason:** Beautiful but purposeless content distracts from the main goal. Every sentence must earn its place.

**Consequences:** Keeping irrelevant beautiful content confuses readers and obscures purpose.

**Philosophy:** Purpose over personal attachment - serve the reader's needs.

**Origin:** Sir Arthur Quiller-Couch - when writing doesn't serve the story, cut it regardless of beauty.

**Examples:**
- Darling: "Elaborate metaphor that sounds clever but confuses the point"
- Clear: "Direct statement of the concept"

**Applies to:** component_text, documentation, essays, user_interface

---

## Priority 8 Rules (Important)

### STRUNK_SENTENCE_VARIETY_001: Vary Sentence Structure

**Rule:** Avoid succession of loose sentences. Vary sentence structure. Connect related ideas with subordination and coordination.

**Reason:** Monotonous sentence patterns create boring, choppy prose. Variety creates flow and emphasizes relationships.

**Consequences:** All simple sentences create choppy, elementary writing style.

**Philosophy:** Sentence structure should support meaning and create readable rhythm.

**Examples:**
- Choppy: "The user clicked submit. The form validated. The data was saved. A confirmation appeared."
- Varied: "When the user clicked submit, the form validated and saved the data, then displayed a confirmation."

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_PARAGRAPH_UNITY_001: Paragraph Unity

**Rule:** Make the paragraph the unit of composition. Begin each paragraph with a topic sentence that states the main idea.

**Reason:** Paragraphs with clear topic sentences help readers follow the argument and understand structure.

**Consequences:** Paragraphs without clear focus confuse readers about the main point.

**Philosophy:** Each paragraph should advance one main idea.

**Examples:**
- Clear: "Architect components ensure accessibility. Every component includes proper ARIA labels, keyboard navigation, and semantic structure."
- Unfocused: "Architect has many features. Components are accessible. We also have good performance. Users like the interface."

**Applies to:** documentation, essays, user_interface

---

### STRUNK_RELATED_WORDS_001: Keep Related Words Together

**Rule:** Keep related words together. 'He only found two coins' → 'He found only two coins'. Place modifiers near what they modify.

**Reason:** Separated related words create confusion about what modifies what.

**Consequences:** Misplaced words can completely change meaning or create ambiguity.

**Philosophy:** Word order should reflect logical relationships.

**Examples:**
- Separated: "He only found two coins" / "She almost ate everything"
- Together: "He found only two coins" / "She ate almost everything"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_TENSE_CONSISTENCY_001: Maintain Verb Tense Consistency

**Rule:** Maintain verb tense consistency throughout passages. Once you establish a tense for describing events or procedures, maintain that tense throughout the section unless there's a clear logical reason to shift. This applies especially to documentation, tutorials, and procedural text.

**Reason:** Consistent verb tense creates smooth reading flow and prevents confusion about when actions occur. In technical documentation, tense shifts can make procedures unclear.

**Consequences:** Inconsistent tense creates jarring reading experiences and can confuse users about the sequence or timing of actions, especially in instructional content.

**Philosophy:** Consistent grammatical patterns allow readers to focus on content meaning rather than being distracted by structural inconsistencies.

**Examples:**
- Incorrect: "First, open the file. Then you will save it. Next, we closed the application." / "The user clicks the button and then selected an option." / "Configure the settings, then you have tested the connection."
- Correct: "First, open the file. Then save it. Next, close the application." / "The user clicks the button and then selects an option." / "Configure the settings, then test the connection."

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_SERIAL_COMMA_001: Use Serial Comma

**Rule:** Use serial comma before 'and' in series: 'A, B, and C' not 'A, B and C'.

**Reason:** Serial comma prevents ambiguity and misreading. Eliminates confusion about grouping.

**Consequences:** Missing serial comma can create unintended associations or unclear meaning.

**Philosophy:** Clarity over brevity - one character prevents misunderstanding.

**Examples:**
- Unclear: "I invited my parents, Einstein and Tesla" (sounds like parents ARE Einstein and Tesla)
- Clear: "I invited my parents, Einstein, and Tesla" (three separate parties)

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_INTRODUCTORY_COMMA_001: Use Comma After Introductory Expressions

**Rule:** Use comma after introductory expressions. When starting a sentence with introductory words, phrases, or clauses, place a comma after them to separate them from the main clause. This helps readers identify where the introduction ends and the main sentence begins.

**Reason:** Introductory commas provide essential visual breaks that help readers parse sentence structure correctly and understand the relationship between introductory elements and main clauses.

**Consequences:** Without introductory commas, readers may misparse sentences, leading to confusion about meaning and awkward reading rhythm. This is particularly problematic in technical documentation where precision is crucial.

**Philosophy:** Clear punctuation serves as visual syntax that guides readers through complex ideas, mirroring how code uses indentation and brackets to show structure.

**Examples:**
- Incorrect: "After the meeting we discussed the results" / "In the morning the server crashed" / "Because of the error users couldn't login"
- Correct: "After the meeting, we discussed the results" / "In the morning, the server crashed" / "Because of the error, users couldn't login"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_QUOTATION_MARKS_001: Place Quotation Marks Correctly

**Rule:** Place quotation marks correctly with periods and commas. In American English, periods and commas always go inside quotation marks, regardless of whether they are part of the quoted material. This applies to both direct quotes and when referring to titles or specific terms.

**Reason:** Consistent quotation mark placement follows established American English conventions and maintains professional appearance in documentation and user interfaces.

**Consequences:** Incorrect quotation mark placement appears unprofessional and can confuse readers about what is being quoted. In technical documentation, this inconsistency undermines credibility.

**Philosophy:** Typographical conventions serve as shared standards that allow readers to focus on content rather than being distracted by formatting inconsistencies.

**Examples:**
- Incorrect: `He said "Hello world". The function is called "getData".` / `The error message was "File not found"; please check the path.` / `Click the "Save" button, then close the dialog.`
- Correct: `He said "Hello world." The function is called "getData."` / `The error message was "File not found;" please check the path.` / `Click the "Save" button, then close the dialog.`

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_SEMICOLON_001: Use Semicolons Correctly

**Rule:** Use semicolon to separate independent clauses not joined by conjunction. 'The meeting ran late; we missed dinner' not 'The meeting ran late, we missed dinner'.

**Reason:** Comma splice is grammatically incorrect and creates run-on sentences.

**Consequences:** Comma splices confuse readers about sentence boundaries and relationships.

**Philosophy:** Proper punctuation supports clear meaning.

**Examples:**
- Comma splice: "The server crashed, all data was lost" / "She studied hard, the test was still difficult"
- Correct: "The server crashed; all data was lost" / "She studied hard, but the test was still difficult"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_THAT_WHICH_001: That vs Which

**Rule:** Use 'that' for restrictive clauses, 'which' for non-restrictive. 'The car that is red' (specific car) vs 'The car, which is red' (additional info).

**Reason:** That/which distinction clarifies whether information is essential or supplementary.

**Consequences:** Wrong usage creates ambiguity about what information is critical.

**Philosophy:** Grammar should clarify meaning, not obscure it.

**Examples:**
- Restrictive: "The report that was filed yesterday needs review" (specific report)
- Non-restrictive: "The report, which was filed yesterday, needs review" (additional info about the report)

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_AVOID_AND_OR_001: Avoid And/Or

**Rule:** Avoid 'and/or' constructions. Instead of using 'and/or', choose either 'and' or 'or' based on the intended meaning, or rewrite the sentence to be clearer. The slash construction is often imprecise and can confuse readers about what relationships actually exist.

**Reason:** The 'and/or' construction is imprecise and forces readers to interpret multiple possible meanings simultaneously, reducing clarity in professional communication.

**Consequences:** Using 'and/or' creates ambiguity about whether options are exclusive, inclusive, or both. This can lead to misunderstandings, especially in technical specifications or user instructions.

**Philosophy:** Clear writing makes definitive statements about relationships between concepts rather than forcing readers to interpret multiple possibilities.

**Examples:**
- Vague: "Users can edit and/or delete records" / "Submit via email and/or fax" / "Choose one and/or more options"
- Concrete: "Users can edit or delete records" / "Submit via email or fax" / "Choose one or more options"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_AVOID_THERE_ARE_001: Avoid "There Is/Are"

**Rule:** Avoid beginning sentences with 'there is/are'. These constructions create weak, indirect openings. Instead, lead with the actual subject or a more direct statement. This creates stronger, more engaging prose that gets to the point quickly.

**Reason:** Eliminating 'there is/are' openings creates more direct, engaging prose by putting the real subject first and reducing unnecessary words.

**Consequences:** Overusing 'there is/are' constructions creates weak, wordy prose that delays getting to the main point, potentially losing reader attention and reducing impact.

**Philosophy:** Strong writing leads with meaningful subjects and active constructions rather than delaying the real content with filler words.

**Examples:**
- Weak: "There are several bugs in the code" / "There is a problem with the server" / "There are three options available"
- Strong: "Several bugs exist in the code" / "The server has a problem" / "Three options are available"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_EMPHATIC_END_001: Place Emphatic Words at End

**Rule:** Place emphatic words at the end of sentences. 'Socialism is a good thing, I suppose' → 'I suppose socialism is a good thing'.

**Reason:** The end position receives natural emphasis in English. Important words should go there.

**Consequences:** Burying important words in the middle weakens impact and clarity.

**Philosophy:** Sentence structure should support meaning and emphasis.

**Examples:**
- Weak: "Socialism is a good thing, I suppose" / "The server crashed, unfortunately"
- Emphatic: "I suppose socialism is a good thing" / "Unfortunately, the server crashed"

**Applies to:** component_text, documentation, essays, user_interface

---

## Priority 7 Rules (Helpful)

### STRUNK_PARENTHETIC_001: Enclose Parenthetic Expressions

**Rule:** Enclose parenthetic expressions between commas. 'The report, which was due yesterday, is still incomplete'.

**Reason:** Commas signal that information is supplementary, not essential to the main statement.

**Consequences:** Missing commas make it unclear what information is essential vs supplementary.

**Philosophy:** Punctuation should clarify meaning and information hierarchy.

**Examples:**
- Correct: "The manager, who started last month, called a meeting" / "My brother, an engineer, designed the bridge"
- Wrong: "The manager who started last month called a meeting" / "My brother an engineer designed the bridge"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_DASH_HYPHEN_001: Distinguish Dashes and Hyphens

**Rule:** Distinguish between dash and hyphen usage. Use em dashes (—) for parenthetical breaks, interruptions, or to set off explanatory material. Use hyphens (-) for compound words, prefixes, and line breaks. En dashes (–) are for ranges and connections between equal elements.

**Reason:** Proper dash and hyphen usage creates clear visual distinctions between different types of breaks and connections, improving readability and professional appearance.

**Consequences:** Incorrect dash/hyphen usage creates visual inconsistency and can confuse readers about the relationship between ideas. Overuse of hyphens where dashes belong weakens the prose.

**Philosophy:** Different punctuation marks serve specific semantic purposes—using them correctly helps readers understand the precise relationship between concepts.

**Examples:**
- Incorrect: "The API - which handles authentication - was updated" / "twenty-five to thirty users" / "self-contained component" / "The server crashed-we lost all data"
- Correct: "The API—which handles authentication—was updated" / "twenty-five to thirty users" / "self-contained component" / "The server crashed—we lost all data"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_POSSESSIVE_001: Form Possessives Correctly

**Rule:** Form possessive singular by adding 's: James's, Mars's, the witness's. This applies to all singular nouns.

**Reason:** Consistent possessive formation eliminates confusion and follows standard English rules.

**Consequences:** Inconsistent possessives (James' vs James's) create style inconsistency.

**Philosophy:** Consistency in grammar supports clear communication.

**Examples:**
- Correct: "James's book" / "Mars's surface" / "the witness's testimony"
- Wrong: "James' book" / "Mars' surface" / "the witness' testimony"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_FEWER_LESS_001: Fewer vs Less

**Rule:** Use 'fewer' for countable nouns, 'less' for mass nouns. Use 'fewer' when you can count individual items ('fewer errors', 'fewer users'). Use 'less' for quantities that cannot be counted individually ('less time', 'less memory', 'less complexity').

**Reason:** The fewer/less distinction reflects logical differences between countable and uncountable quantities, maintaining precision in technical and professional communication.

**Consequences:** Using 'less' with countable nouns sounds informal and can distract readers from your content, potentially undermining professional credibility in formal documents.

**Philosophy:** Language precision mirrors the logical distinctions that matter in programming—different types of quantities deserve different grammatical treatment.

**Examples:**
- Incorrect: "less bugs" / "less features" / "less options" / "less iterations"
- Correct: "fewer bugs" / "fewer features" / "fewer options" / "fewer iterations"

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_WHILE_ALTHOUGH_001: While vs Although

**Rule:** Use 'while' for time, 'although' for concession. Reserve 'while' for temporal relationships (things happening simultaneously) and use 'although', 'though', or 'whereas' for contrasts or concessions. This distinction creates clearer logical relationships.

**Reason:** Precise word choice clarifies the logical relationship between clauses, helping readers understand whether you're indicating time, contrast, or concession.

**Consequences:** Using 'while' for contrast can momentarily confuse readers about timing versus logical relationships, slowing comprehension and weakening argument structure.

**Philosophy:** Each word should carry precise semantic meaning—using the right conjunction helps readers follow your logical flow effortlessly.

**Examples:**
- Incorrect: "While I understand your concern, I disagree" / "The system works while being inefficient" / "While the code compiles, it has bugs"
- Correct: "Although I understand your concern, I disagree" / "The system works, although inefficiently" / "Though the code compiles, it has bugs"

**Applies to:** component_text, documentation, essays, user_interface

---

## Usage Guidelines

### Priority Levels

Rules are prioritized from 1-10, where:
- **10**: Critical rules that must always be followed
- **9**: Very important rules that significantly impact clarity
- **8**: Important rules that improve readability
- **7**: Helpful rules that polish professional writing

### Application Context

Rules apply to different content types:
- **component_text**: Text within UI components
- **documentation**: Technical documentation, guides, tutorials
- **essays**: Long-form explanatory content
- **user_interface**: Labels, buttons, messages, dialogs

### Target Audience

Default audience for Sitebender projects: designers, hobbyists, and laypersons (not enterprise developers). Adjust language complexity accordingly.

### Reading Level

Target maximum: 8th grade reading level for accessibility while maintaining technical precision where necessary.

---

## References

- Strunk, William Jr., and E.B. White. *The Elements of Style*
- Quiller-Couch, Sir Arthur. "On the Art of Writing" (origin of "murder your darlings")
- Plain Language Guidelines (plainlanguage.gov)
