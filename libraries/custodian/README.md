# Custodian

State management that respects the web's fundamental architecture. Works without JavaScript, enhances progressively, and treats the server as the source of truth.

## Philosophy

Custodian rejects the modern antipattern of duplicating server state on the client. Instead, it embraces the web's original design: stateless requests with state encoded in URLs and forms. When JavaScript is available, Custodian intercepts these interactions for optimistic updates and offline support, but the fundamental model remains unchanged.

Every interaction works identically with or without JavaScript:

- **Lynx/IE11**: Form submission → server processes → new page
- **Modern browser (no JS)**: Same as above
- **Modern browser (JS)**: Form submission → preventDefault → local state update → background sync

## Core Concepts

### Idempotent Operations

All state mutations use UUID-based idempotent operations. Forms include server-generated UUIDs that guarantee exactly-once semantics:

```typescript
//++ Transforms HTML form into idempotent operation
export function deriveOperation(form: HTMLFormElement): Operation {
	const method = getFormMethod(form)
	const uuid = getFormUUID(form)

	if (isNil(uuid)) {
		return Left(new Error("All operations require a UUID"))
	}

	return Right({
		id: uuid,
		method: method,
		idempotencyKey: uuid,
		resource: extractResourcePath(form),
		data: new FormData(form),
	})
}
```

### URL as State Container

UI state lives entirely in the URL. Every UI interaction is a navigation:

```
/dashboard
  ?accordion=2          // Which accordion is open
  &tab=settings        // Active tab
  &sort=date           // Table sort
  &order=asc           // Sort order
  &filters=active,new  // Active filters
  &page=3              // Current page
  #row-42              // Scroll position
```

The server reads this URL and renders the appropriate state. With JavaScript, we intercept navigation and update locally.

### Continuations for Complex Flows

Form wizards and multi-step processes use cryptographically signed continuation tokens:

```typescript
//++ Secure continuation for resumable workflows
type WizardContinuation = {
	step: number
	data: Record<string, unknown> // Accumulated data
	remaining: Array<number> // Steps left
	rollback: string // Previous continuation
	expires: number // Time-bound
	nonce: string // Prevent replay
	signature: string // Tamper-proof
}
```

Users can bookmark a form halfway through and resume weeks later. The continuation is the computation frozen in time.

### State Machines

All state transitions follow pure, declarative state machines:

```typescript
//++ State machine definition
type StateMachine<S, E> = {
	id: string
	initial: S
	states: {
		[K in S]: {
			on: {
				[Event in E]?: {
					target: S
					guard?: string
					actions?: Array<string>
				}
			}
		}
	}
}
```

State machines work identically server-side (from form submissions) or client-side (from intercepted events).

## Progressive Enhancement Architecture

### Layer 0: Pure HTML (No JavaScript)

```html
<!-- State in URL -->
<a href="/app?tab=profile">Profile</a>

<!-- State via forms -->
<form method="POST" action="/api/items">
	<input type="hidden" name="_method" value="PUT" />
	<input type="hidden" name="_uuid" value="550e8400-e29b-41d4-a716" />
	<input name="title" required />
	<button>Save</button>
</form>
```

### Layer 1: Enhanced with JavaScript

```typescript
//++ Intercepts forms for local state management
export function enhanceForm(form: HTMLFormElement): void {
	const operation = deriveOperation(form)

	if (isLeft(operation)) {
		return
	}

	form.addEventListener("submit", function (e) {
		e.preventDefault()

		// Apply optimistically
		applyOperationLocally(operation.value)

		// Queue for sync (works offline)
		queueOperation(operation.value)

		// Update URL for shareability
		updateURL(operation.value)
	})
}
```

## Security & Privacy

### Signed Continuations

All continuations are cryptographically signed and time-bound:

```typescript
//++ Creates tamper-proof continuation
export function signContinuation(
	data: WizardContinuation,
	secret: string,
): string {
	const payload = toJson(0)(data)
	const signature = hashHex(concat(payload)(secret))

	return concat(base64Encode(payload))(".")(base64Encode(signature))
}
```

### Privacy-Aware State

```typescript
//++ State classification for privacy
type PrivacyAwareState = {
	public: Record<string, unknown> // Can go in URL
	private: Record<string, unknown> // Server-side only
	ephemeral: Record<string, unknown> // Never persisted
}
```

### Zero-Knowledge Proofs

Sensitive data stays server-side with only proof of validity exposed:

```typescript
//++ Zero-knowledge resumption token
export function createResumptionToken(state: PrivacyAwareState): string {
	const proof = hashPrivateData(state.private)

	return signToken({
		public: state.public,
		proof, // Verify without exposing
		expires: add(Date.now())(86400000),
	})
}
```

## Integration

### With Architect

Custodian triggers Architect's reactive behaviors via DOM events:

```typescript
//++ Triggers Architect calculations after state change
function notifyArchitect(element: HTMLElement): void {
	const event = new InputEvent("input", {
		bubbles: true,
		cancelable: true,
	})
	element.dispatchEvent(event)
}
```

### With Agent

State operations become distributed CRDT operations:

```typescript
//++ Converts operations to CRDT format
export function toCRDTOperation(op: Operation): CRDTOperation {
	return {
		id: op.id,
		type: op.method,
		timestamp: now(),
		payload: objectFromFormData(op.data),
		vector: getCurrentVectorClock(),
	}
}
```

### With Triple Store

Forms generate SPARQL updates:

```typescript
//++ Generates SPARQL from form submission
export function toSparqlUpdate(operation: Operation): string {
	const uuid = operation.id
	const triples = formDataToTriples(operation.data)

	return buildSparqlInsert(uuid)(triples)
}
```

## API

### Declarative JSX Components (Primary API)

Custodian is designed to be used **declaratively via JSX components**. See the extensive [Visual State Machine Workflow System](#visual-state-machine-workflow-system) section above for detailed examples of the component-based API.

Users interact with Custodian through components like:
- `<StateMachineWorkflowCanvas>` - Main workflow canvas
- `<StateMachineDesigner>` - State machine designer
- `<State>` - Individual state definitions
- `<Transition>` - State transitions
- `<CollaborativeStateMachineDesign>` - Real-time collaboration
- And many more (see Visual Workflow section)

### Functional API (Advanced/Internal)

For advanced use cases or internal implementation, Custodian also exposes functional primitives:

```typescript
//++ Creates a Custodian instance
export function createCustodian(config: CustodianConfig): Custodian

//++ Derives operation from HTML form
export function deriveOperation(
	form: HTMLFormElement,
): Either<Error, Operation>

//++ Signs continuation for secure resumption
export function signContinuation(
	data: WizardContinuation,
	secret: string,
): string

//++ Verifies and deserializes continuation
export function verifyContinuation(
	token: string,
	secret: string,
): Either<SecurityError, WizardContinuation>

//++ Updates URL with new UI state
export function updateUIState(
	current: URL,
	updates: Record<string, string | null>,
): URL

//++ Applies state machine transition
export function transition<S, E>(
	machine: StateMachine<S, E>,
	current: SecureState<S>,
	event: E,
): Either<SecurityError, SecureState<S>>
```

**Note**: Most users should use the declarative JSX API. The functional API is for advanced customization, library integration, or when building custom tooling.

### Configuration

```typescript
type CustodianConfig = {
	encryption: boolean // Enable encryption
	signing: boolean // Sign all operations
	sessionBinding: boolean // Bind to session
	expirationMinutes: number // Token expiration
	maxContinuationSize: number // Prevent DoS
	allowedOrigins: Array<string> // CORS protection
	sameSite: "strict" | "lax" // Cookie policy
	secure: boolean // HTTPS only
	httpOnly: boolean // Cookie access
}
```

## Examples

### Multi-Step Form Wizard

```typescript
//++ Wizard with continuations
const wizardMachine: StateMachine<WizardState, WizardEvent> = {
	id: "onboarding",
	initial: "name",
	states: {
		name: {
			on: {
				NEXT: { target: "address", guard: "hasValidName" },
				SAVE: { target: "suspended", actions: ["saveContinuation"] },
			},
		},
		address: {
			on: {
				NEXT: { target: "payment" },
				BACK: { target: "name" },
			},
		},
		suspended: {
			on: {
				RESUME: { target: "name", actions: ["restoreContinuation"] },
			},
		},
	},
}
```

### UI State Management

```typescript
//++ Accordion state in URL
export function toggleAccordion(current: URL, accordionId: string): URL {
	const isOpen = equals(current.searchParams.get("accordion"))(accordionId)

	return updateUIState(current, {
		accordion: isOpen ? null : accordionId,
	})
}
```

### Offline-First Operations

```typescript
//++ Queue operations for eventual consistency
export function queueOperation(operation: Operation): Promise<void> {
	const queue = getOperationQueue()
	const enriched = {
		...operation,
		timestamp: now(),
		retryCount: 0,
	}

	return queue.add(enriched)
}
```

## Benefits

- **Universal**: Works in Lynx, IE11, or modern browsers
- **Resumable**: Bookmark and resume complex workflows
- **Shareable**: URL contains complete UI state
- **Offline-capable**: Queue operations, sync when connected
- **Secure**: Signed, encrypted, time-bound tokens
- **Idempotent**: UUID-based operations prevent duplicates
- **Progressive**: Same model with or without JavaScript
- **Type-safe**: Full TypeScript with functional patterns

## Visual State Machine Workflow System

Custodian's state machines become the foundation for visual workflow design, bringing n8n-style visual editing to state management with Sitebender's semantic triple store architecture.

### Visual State Machine Designer

Transform complex state logic into intuitive visual workflows:

```tsx
<StateMachineWorkflowCanvas>
	<StateMachineDesigner id="user-onboarding">
		<States>
			<State name="initial" type="start" position={[100, 200]}>
				<VisualProperties>
					<Shape type="circle" color="green" />
					<Label>Start</Label>
				</VisualProperties>

				<OnEnter actions={["generateToken", "sendWelcomeEmail"]}>
					<ActionNode type="generateToken" />
					<ActionNode type="sendWelcomeEmail" />
				</OnEnter>

				<Transitions>
					<Transition
						to="profile-setup"
						event="email-verified"
						path="bezier"
						color="blue"
					/>
					<Transition
						to="expired"
						event="timeout"
						after="PT24H"
						path="dashed"
						color="red"
					/>
				</Transitions>
			</State>

			<State name="profile-setup" type="form" position={[300, 200]}>
				<VisualProperties>
					<Shape type="rectangle" color="blue" />
					<Label>Profile Setup</Label>
					<FormPreview fields={["fullName", "company", "role"]} />
				</VisualProperties>

				<ContinuationToken encrypted={true} expires="PT7D" />

				<FormFields>
					<Field name="fullName" required={true} />
					<Field name="company" />
					<Field name="role" enum={["developer", "designer", "manager"]} />
				</FormFields>

				<Transitions>
					<Transition
						to="preferences"
						event="form-submitted"
						guard="validProfile"
						color="green"
					/>
					<Transition
						to="profile-setup"
						event="validation-failed"
						actions={["showErrors"]}
						color="orange"
						loopback={true}
					/>
					<Transition to="suspended" event="save-for-later" color="yellow" />
				</Transitions>
			</State>

			<State name="preferences" type="configuration" position={[500, 200]}>
				<VisualProperties>
					<Shape type="hexagon" color="purple" />
					<Label>Preferences</Label>
				</VisualProperties>

				<Transitions>
					<Transition to="completed" event="preferences-saved" color="green" />
					<Transition to="profile-setup" event="back" color="gray" />
				</Transitions>
			</State>

			<State name="suspended" type="pause" position={[300, 400]}>
				<VisualProperties>
					<Shape type="octagon" color="yellow" />
					<Label>Suspended</Label>
					<Icon name="pause" />
				</VisualProperties>

				<ResumptionToken secure={true} />

				<Transitions>
					<Transition
						to="profile-setup"
						event="resume-link-clicked"
						color="blue"
					/>
					<Transition to="expired" event="timeout" after="PT30D" color="red" />
				</Transitions>
			</State>

			<State name="completed" type="final" position={[700, 200]}>
				<VisualProperties>
					<Shape type="double-circle" color="green" />
					<Label>Completed</Label>
					<Icon name="checkmark" />
				</VisualProperties>

				<OnEnter
					actions={["createAccount", "provisionResources", "notifyTeam"]}
				>
					<ActionNode type="createAccount" />
					<ActionNode type="provisionResources" />
					<ActionNode type="notifyTeam" />
				</OnEnter>
			</State>

			<State name="expired" type="error" position={[500, 400]}>
				<VisualProperties>
					<Shape type="diamond" color="red" />
					<Label>Expired</Label>
					<Icon name="warning" />
				</VisualProperties>

				<OnEnter actions={["cleanupResources", "sendExpiryNotice"]}>
					<ActionNode type="cleanupResources" />
					<ActionNode type="sendExpiryNotice" />
				</OnEnter>
			</State>
		</States>

		<ErrorRecovery>
			<RetryPolicy attempts={3} backoff="linear" />
			<FallbackActions>
				<OnNetworkError action="queueForLater" />
				<OnValidationError action="preservePartialState" />
			</FallbackActions>
		</ErrorRecovery>

		<Monitoring>
			<StateTransitionMetrics />
			<AverageCompletionTime />
			<DropOffAnalysis />
		</Monitoring>
	</StateMachineDesigner>

	<DesignTools>
		<StateLibrary>
			<Template type="form-state" />
			<Template type="approval-state" />
			<Template type="processing-state" />
			<Template type="error-state" />
		</StateLibrary>

		<ValidationTools>
			<DeadlockDetection />
			<UnreachableStateDetection />
			<InfiniteLoopPrevention />
		</ValidationTools>
	</DesignTools>
</StateMachineWorkflowCanvas>
```

### Real-Time State Execution Visualization

Watch state machines execute in real-time with visual feedback:

```tsx
<StateExecutionMonitor>
	<CurrentExecution>
		<ActiveState highlight="pulsing-blue">profile-setup</ActiveState>
		<StateHistory trail="breadcrumb-style">
			<PreviousState>initial</PreviousState>
			<CurrentState>profile-setup</CurrentState>
		</StateHistory>

		<TransitionAnimation>
			<AnimateStateChange duration="300ms" easing="ease-in-out" />
			<ShowDataFlow from="input" to="state" />
			<HighlightActiveTransitions />
		</TransitionAnimation>
	</CurrentExecution>

	<ExecutionMetrics>
		<StateTimer current="PT2M15S" />
		<TransitionCount total={3} />
		<ErrorCount current={0} />
		<RetryAttempts current={0} max={3} />
	</ExecutionMetrics>

	<DataInspection>
		<StateData>
			<Property name="userId" value="user-123" />
			<Property name="formData" value='{"fullName": "John Doe"}' />
			<Property name="continuationToken" value="encrypted..." />
		</StateData>

		<EventHistory>
			<Event timestamp="2024-01-15T10:30:00Z" type="email-verified" />
			<Event timestamp="2024-01-15T10:32:15Z" type="form-started" />
		</EventHistory>
	</DataInspection>
</StateExecutionMonitor>
```

### Collaborative State Machine Design

Multiple team members can collaboratively design complex state machines:

```tsx
<CollaborativeStateMachineDesign>
	<Participants>
		<Designer id="ux-designer" role="user-experience" color="purple" />
		<Developer id="frontend-dev" role="implementation" color="blue" />
		<ProductManager id="pm" role="requirements" color="green" />
		<QAEngineer id="qa" role="testing" color="orange" />
	</Participants>

	<SharedCanvas>
		<RealTimeEditing>
			<CursorSharing />
			<SelectionSync />
			<LiveAnnotations />
		</RealTimeEditing>

		<ConflictResolution>
			<OperationalTransform for="node-positioning" />
			<LastWriteWins for="state-properties" />
			<ConsensusRequired for="state-deletion" />
		</ConflictResolution>
	</SharedCanvas>

	<RoleBasedPermissions>
		<UXDesigner>
			<Can action="design-flow" />
			<Can action="add-states" />
			<Cannot action="implement-actions" />
		</UXDesigner>

		<Developer>
			<Can action="implement-actions" />
			<Can action="define-guards" />
			<Can action="optimize-performance" />
		</Developer>

		<ProductManager>
			<Can action="define-requirements" />
			<Can action="approve-flow" />
			<Cannot action="modify-implementation" />
		</ProductManager>
	</RoleBasedPermissions>
</CollaborativeStateMachineDesign>
```

### Workflow State Recovery and Resilience

Visual workflow state management with automatic recovery:

```tsx
<WorkflowStateRecovery>
	<CheckpointStrategy>
		<VisualCheckpoints>
			<AutoSave interval="PT1M" visualIndicator="saving-spinner" />
			<StateSnapshot on="state-transition" showInTimeline={true} />
			<ContinuationTokens encrypted={true} displayStatus={true} />
		</VisualCheckpoints>

		<RecoveryVisualization>
			<ShowRecoveryPath from="last-checkpoint" to="current-state" />
			<HighlightRestoredData />
			<DisplayRecoveryMetrics />
		</RecoveryVisualization>
	</CheckpointStrategy>

	<RecoveryPolicies>
		<OnCrash>
			<VisualRecovery>
				<ShowRecoveryProgress />
				<DisplayRecoveryOptions />
				<AllowUserChoice for="data-restoration" />
			</VisualRecovery>

			<AutomaticRecovery>
				<RestoreFromLastCheckpoint />
				<ReplayMissedEvents since="last-checkpoint" />
				<ValidateStateConsistency />
				<ResumeExecution from="safe-point" />
			</AutomaticRecovery>
		</OnCrash>

		<OnNetworkPartition>
			<OfflineVisualization>
				<ShowOfflineMode />
				<QueueOperations locally={true} />
				<DisplaySyncStatus />
			</OfflineVisualization>

			<ReconnectionFlow>
				<ConflictResolutionOnReconnect strategy="crdt-merge" />
				<StateReconciliation with="distributed-peers" />
				<ShowMergeResults />
			</ReconnectionFlow>
		</OnNetworkPartition>
	</RecoveryPolicies>
</WorkflowStateRecovery>
```

### State Machine Analytics and Optimization

Analyze state machine performance with visual insights:

```tsx
<StateMachineAnalytics>
  <FlowAnalytics>
    <StateUtilization>
      <HeatMap states={true} transitions={true} />
      <UsageStatistics>
        <MostVisitedStates />
        <LeastUsedTransitions />
        <BottleneckStates />
      </UsageStatistics>
    </StateUtilization>
    
    <UserJourneyAnalysis>
      <PathVisualization>
        <CommonPaths thickness="proportional-to-usage" />
        <AbandonmentPoints highlight="red" />
        <OptimalPaths highlight="green" />
      </PathVisualization>
      
      <ConversionFunnels>
        <StateConversions />
        <DropOffRates />
        <TimeToCompletion />
      </ConversionFunnels>
    </UserJourneyAnalysis>
  </FlowAnalytics>
  
  <PerformanceOptimization>
    <SlowStateDetection>
      <IdentifyBottlenecks />
      <SuggestOptimizations />
      <A/BTestAlternatives />
    </SlowStateDetection>
    
    <AutoOptimization>
      <ParallelStateExecution for="independent-states" />
      <StateCoalescing for="similar-states" />
      <TransitionOptimization for="frequent-paths" />
    </AutoOptimization>
  </PerformanceOptimization>
</StateMachineAnalytics>
```

### Integration with Workflow Systems

State machines integrate seamlessly with broader workflow systems:

```tsx
<WorkflowIntegration>
	<WorkflowToStateMachine>
		<WorkflowStage name="user-onboarding">
			<EmbeddedStateMachine ref="user-onboarding-fsm" />
			<StateCallbacks>
				<OnStateEnter callback="logUserProgress" />
				<OnStateExit callback="updateMetrics" />
				<OnCompletion callback="triggerNextWorkflowStage" />
			</StateCallbacks>
		</WorkflowStage>
	</WorkflowToStateMachine>

	<CrossWorkflowCommunication>
		<StateMachineEvents>
			<PublishEvent when="state-changed" to="operator.events" />
			<SubscribeToEvent from="external-system" trigger="state-transition" />
		</StateMachineEvents>

		<WorkflowOrchestration>
			<ConditionalWorkflows>
				<TriggerWorkflow
					when="state === 'completed'"
					workflow="post-onboarding-tasks"
				/>
				<BlockWorkflow
					when="state === 'suspended'"
					workflow="user-activation-emails"
				/>
			</ConditionalWorkflows>
		</WorkflowOrchestration>
	</CrossWorkflowCommunication>
</WorkflowIntegration>
```

### State Machine as Data

Like all Sitebender components, state machines are stored as semantic data:

```turtle
@prefix fsm: <https://sitebender.studio/custodian#> .
@prefix workflow: <https://sitebender.studio/workflow#> .

<fsm:user-onboarding> a fsm:StateMachine ;
  fsm:initialState <state:initial> ;
  fsm:states <state:initial>, <state:profile-setup>, <state:completed> ;
  workflow:partOf <workflow:user-activation-pipeline> .

<state:initial> a fsm:State ;
  fsm:type "start" ;
  fsm:position [fsm:x 100; fsm:y 200] ;
  fsm:onEnter "generateToken", "sendWelcomeEmail" ;
  fsm:transitionsTo <transition:email-verified> .

<transition:email-verified> a fsm:Transition ;
  fsm:from <state:initial> ;
  fsm:to <state:profile-setup> ;
  fsm:event "email-verified" ;
  fsm:visualPath "bezier" ;
  fsm:color "blue" .
```

This transforms Custodian from a simple state management library into a **visual state machine design and execution platform** that enables complex workflow orchestration with intuitive visual design tools.

## Philosophy Redux

Custodian isn't trying to be clever. It's returning to the web's roots: stateless HTTP, semantic HTML, progressive enhancement. The radical idea is that we never needed to abandon these principles. We just needed to implement them correctly.

State isn't something to be "managed" - it's something to be transformed through pure functions, encoded in URLs, and synchronized via idempotent operations. The browser already has a state machine (the history API), a persistence layer (URLs), and a synchronization protocol (HTTP). Custodian simply orchestrates these existing pieces into a coherent whole.

With the addition of visual state machine workflows, Custodian bridges the gap between the web's stateless foundation and modern application complexity - providing the tools to design, visualize, and manage complex state flows while never abandoning the web's core principles.

The future of web development isn't more complexity - it's rediscovering the elegant simplicity that was there all along, enhanced with the tools to handle complexity when truly necessary.

---

## Development Plan

Custodian is being developed in two distinct phases: MVP (minimum viable product) and post-MVP enhancements.

### MVP: Core Functionality (Phases 1-5)

**Timeline**: 2-3 months | **Tasks**: ~100 tasks

The MVP delivers the essential features that make Custodian valuable:

- ✅ **Phase 1: Foundation** - Core types and contracts
- ✅ **Phase 2: No-JS Implementation** - Server-side state management working in Lynx
- ✅ **Phase 3: Continuations** - Resumable workflows with cryptographic security
- ✅ **Phase 4: State Machines** - Declarative state transitions
- ✅ **Phase 5: Progressive Enhancement** - JavaScript layer maintaining identical behavior

**Goal**: Working state management in text browsers, enhanced in modern browsers. State machines with secure continuations. No visual designer, no collaboration, no analytics.

**Success Criteria**:
- Works without JavaScript in all browsers (including Lynx)
- All UI state encoded in URLs
- Idempotent operations prevent duplicates
- Continuations cryptographically secure
- Progressive enhancement seamless
- 100% test coverage with property tests

**👉 For detailed MVP tasks**, see [`MASTER_PLAN.md`](MASTER_PLAN.md)

### Post-MVP: Advanced Features (Phases 6-15)

**Timeline**: ~23 months (AFTER MVP validation) | **Tasks**: ~299 tasks

Post-MVP phases add visual tooling, collaboration, analytics, and production features:

- **Phase 6**: Visual State Machine Designer (n8n-style drag-and-drop)
- **Phase 7**: Real-Time State Execution Visualization
- **Phase 8**: Collaborative State Machine Design
- **Phase 9**: Workflow State Recovery
- **Phase 10**: State Machine Analytics
- **Phase 11**: Workflow Integration
- **Phase 12**: State Monad Integration
- **Phase 13**: Integration & Ecosystem
- **Phase 14**: Documentation & Developer Experience
- **Phase 15**: Production Hardening & Release

**⚠️ Important**: Post-MVP work begins **only after**:
- MVP running in production for 3-6 months
- Real user validation
- 99.9% uptime achieved
- Positive user feedback
- Technical debt addressed

**👉 For complete post-MVP details**, see [`POST_MVP_ROADMAP.md`](POST_MVP_ROADMAP.md)

### Contributing

**For Contributors**:
1. Start with [`PLANNING_GUIDE.md`](PLANNING_GUIDE.md) to understand the document structure
2. Review [`MASTER_PLAN.md`](MASTER_PLAN.md) for current tasks and progress
3. Follow test-driven development strictly
4. Update progress as you complete tasks

**Development Principles**:
- Test-first, always (TDD throughout)
- Pure functions only (no classes, no mutations)
- One function per file with tests alongside
- Query MCP servers for Studio rules before coding
- Property tests prove invariants

**Archived Planning**:
- Original comprehensive plans archived in `docs/archive/`
- Refer to archives for historical context only
- Active development follows MASTER_PLAN.md

### Current Status

**Phase**: Phase 1 - Foundation (Not Started)
**Progress**: 0/168 MVP tasks complete (0%)
**Next**: Write tests for Operation type validation

See [`MASTER_PLAN.md`](MASTER_PLAN.md) for the complete implementation plan and current task details.
