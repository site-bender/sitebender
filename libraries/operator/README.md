# Operator

Pure functional pub/sub system enabling reactive communication through declarative TSX components. Events flow as triples through a multi-layer transport fabric that scales seamlessly from local DOM events to distributed global systems.

## Overview

Operator treats events as first-class data in Studio's triple store architecture. Every event is a triple (subject-predicate-object), making your entire event history queryable via SPARQL, perfectly reproducible, and cryptographically verifiable.

## Installation

```typescript
import Channel from "@sitebender/operator/components/Channel/index.ts"
import Publishes from "@sitebender/operator/components/Publishes/index.ts"
import Subscribes from "@sitebender/operator/components/Subscribes/index.ts"
```

## Core Concepts

### Events as Triples

All events in Operator are RDF triples stored in the triple store:

```tsx
<Publisher
	subject="user-123"
	predicate="clicked"
	object="button-save"
	timestamp="temporal"
/>
```

This enables:

- SPARQL queries over event history
- Time-travel debugging
- Perfect event replay
- Cryptographic verification

### Transport Layers

Operator automatically selects optimal transport based on scope:

1. **Local** (same tab): Custom DOM events with WeakMap registry
2. **Broadcast** (cross-tab): BroadcastChannel with localStorage fallback
3. **Network** (cross-device): WebTransport (HTTP/3) → WebRTC → WebSocket fallback chain
4. **Distributed** (global): libp2p pubsub with IPFS content addressing

## Basic Usage

### Publishing Events

```tsx
<Channel id="user-actions" scope="local">
	<Button>
		<Publishes event="click" as="user:clicked:button" />
		Save
	</Button>
</Channel>
```

### Subscribing to Events

```tsx
<Panel>
	<Subscribes to="user:clicked:*" then={<Effect apply={updatePanel} />} />
</Panel>
```

### Event Transformation

```tsx
<Button>
	<Publishes
		event="click"
		as="payment:initiated"
		with={<Transform map={clickToPayment} />}
	/>
	Pay Now
</Button>
```

### Event Filtering

```tsx
<Dashboard>
	<Subscribes
		to="metrics:*"
		when={<Filter match={isAboveThreshold} />}
		then={<Effect apply={showAlert} />}
	/>
</Dashboard>
```

## Advanced Patterns

### Cross-Scope Bridging

Connect different transport layers seamlessly:

```tsx
<Bridge from="local:user-actions" to="broadcast:user-actions">
	<Encrypt with="nacl-box" for={["did:key:xyz", "did:key:abc"]} />
</Bridge>
```

### Monadic Event Pipelines

Compose complex event processing with Toolsmith monads:

```tsx
<Subscribes to="sensor:reading">
	<Pipe>
		<Map with={parseReading} />
		<Filter with={isValid} />
		<FlatMap with={enrichWithContext} />
		<Fold with={calculateAverage} into={0} />
		<Fork>
			<Left>
				<Log to="metrics" />
			</Left>
			<Right>
				<Render to="display" />
			</Right>
		</Fork>
	</Pipe>
</Subscribes>
```

### Temporal Event Lattices

Events form a partially ordered lattice with vector clocks:

```tsx
<Channel id="collaborative" ordering="causal">
	<VectorClock />
	<CrdtMerge strategy="lww-element-set" />
</Channel>
```

### Homomorphic Processing

Process encrypted events without decryption:

```tsx
<Subscribes to="salary:updated">
	<HomomorphicSum
		compute="average"
		without="decrypting"
		reveal="only-to-authorized"
	/>
</Subscribes>
```

### Quantum Superposition

Events exist in superposition until observed:

```tsx
<Publisher entangled="true">
	<Superpose states={["saved", "saving", "error"]} />
	<Collapse when={<Observe by="user-interface" />} />
</Publisher>
```

## Security & Privacy

### Capability-Based Authorization

```tsx
<Capability
	issuer="did:key:publisher"
	bearer="did:key:subscriber"
	allows={["subscribe", "replay"]}
	expires="PT1H"
/>
```

### Ring Signatures

Anonymous publishing with cryptographic proof of group membership:

```tsx
<Publisher anonymous="ring">
	<RingMembers did={["alice", "bob", "carol"]} />
	<Publishes event="whistleblower:report" />
</Publisher>
```

### Differential Privacy

Add calibrated noise for privacy-preserving analytics:

```tsx
<Analytics epsilon="1.0">
	<Subscribes to="*" aggregate="count" noise="laplacian" />
</Analytics>
```

### Zero-Knowledge Proofs

Verify event properties without revealing content:

```tsx
<Subscribes to="transaction:*">
	<VerifyProof that="amount > 1000" without="revealing-amount" />
</Subscribes>
```

## Smart Contract Events

Execute deterministic computations on events:

```tsx
<Channel blockchain="local-first">
	<SmartEvent
		condition="balance > 100"
		execute="transfer"
		verify="zero-knowledge"
	/>
</Channel>
```

## Neural Event Routing

ML-optimized event prediction and routing:

```tsx
<Optimizer mode="neural">
	<Learn from="event-history" />
	<Predict next="likely-subscribers" />
	<Preload components={predicted} />
</Optimizer>
```

## Server-Side Usage

Identical TSX components work server-side with Deno:

```tsx
<Server transport="quic">
	<Channel id="global">
		<Subscribes to="client:*" from="anywhere" />
		<Publishes to="client:*" everywhere="true" />
	</Channel>
</Server>
```

## WebAssembly Modules

Performance-critical operations run in WASM:

- **Crypto**: libsodium-wasm for all cryptographic operations
- **CRDT**: Automerge-wasm for conflict-free replicated data
- **Routing**: High-performance event routing tables
- **Compression**: Zstandard dictionary compression for event streams

## Testing

Operator integrates with Studio's declarative testing:

```tsx
<TestHarness>
	<MockPublisher id="test-source">
		<EmitSequence events={testEvents} timing="realistic" />
	</MockPublisher>

	<AssertSubscriber to="test:*">
		<Receives exactly={3} within="PT1S" />
		<Ordering is="causal" />
	</AssertSubscriber>
</TestHarness>
```

## Debugging

### Event Replay

```tsx
<Replay from="2024-01-01T00:00:00Z" to="2024-01-01T01:00:00Z">
	<Speed factor={10} />
	<Filter match={debugPredicate} />
</Replay>
```

### Visual Event Flow

The Workshop provides real-time visualization of event flow through your DAG, with filters, breakpoints, and time-travel debugging.

## Performance Measurement

Every event includes timing metadata stored as triples:

- Latency at each transport layer
- Throughput measurements
- Queue depths and backpressure
- All queryable via SPARQL for trend analysis

### Real Metrics, Not Marketing

Operator measures actual performance in production:

```tsx
<PerformanceMonitor>
	<Measure latency="p50,p90,p99" />
	<Measure throughput="events/second" />
	<Measure backpressure="queue-depth" />
	<StoreTo triple-store="metrics" />
</PerformanceMonitor>
```

Query your actual performance:

```sparql
SELECT ?transport ?p99_latency
WHERE {
  ?event op:transport ?transport ;
         op:latency_p99 ?p99_latency ;
         op:timestamp ?time .
  FILTER(?time > NOW() - "PT1H"^^xsd:duration)
}
```

### Baseline Performance Targets

- **Local events**: < 1μs latency
- **Broadcast**: < 1ms latency
- **Network**: < 10ms latency (same region)
- **Distributed**: < 100ms latency (global)
- **Throughput**: 1M+ events/second (local), 100K+ events/second (network)

## Integration with Studio Libraries

### Architect

Operator events trigger DOM updates through Architect's reactive pipeline without VDOM overhead.

### Agent

Distributed events sync through Agent's CRDT adapters for eventual consistency.

### Warden

All event permissions enforced by Warden's capability-based contracts.

### Envoy

Complete event observability through Envoy's documentation graph.

### Auditor

Mathematical proofs verify event ordering and causality invariants.

### Sentinel

Authentication and authorization for event streams via DIDs and VCs.

### Formulator

Dynamic event expressions compiled from formulas.

## Examples

### Real-time Collaboration

```tsx
<Document collaborative="true">
	<Channel scope="network" ordering="causal">
		<Publishes event="cursor:moved" throttle="16ms" />
		<Publishes event="text:changed" debounce="300ms" />
		<Subscribes to="peer:cursor:*" then={<ShowCursor />} />
		<Subscribes to="peer:text:*" then={<MergeText />} />
	</Channel>
</Document>
```

### IoT Sensor Network

```tsx
<SensorNetwork>
	<Channel scope="distributed" transport="mqtt">
		<Subscribes to="sensor:temperature:*">
			<Window size="PT5M" slide="PT1M">
				<Aggregate function="mean" />
				<Alert when={<Threshold above={30} />} />
			</Window>
		</Subscribes>
	</Channel>
</SensorNetwork>
```

### Financial Trading

```tsx
<TradingSystem>
	<Channel scope="network" priority="realtime">
		<Subscribes to="market:tick:*">
			<Pipe>
				<Map with={normalizePrice} />
				<Filter with={isSignificant} />
				<Fork>
					<Left>
						<Execute trade={strategy} />
					</Left>
					<Right>
						<Log to="audit-trail" />
					</Right>
				</Fork>
			</Pipe>
		</Subscribes>
	</Channel>
</TradingSystem>
```

## Event-Driven Workflow Engine

Operator's pub/sub system becomes the backbone of visual workflow execution, providing n8n-style event-driven triggers but with Sitebender's semantic triple store architecture and distributed capabilities.

### Workflow Triggers

Transform system events into workflow executions with declarative trigger components:

```tsx
<WorkflowTriggers>
  {/* Git change triggers */}
  <On event="git.push">
    <Filter>
      <Branch matches="main" />
      <HasFiles pattern="src/**/*.ts" />
    </Filter>
    <Trigger workflow="ci-pipeline" />
    <NotifyPeers via="agent.broadcast" />
  </On>

  {/* Warden violations */}
  <On event="warden.violation">
    <Classify severity={violation.level} />
    <When condition="severity >= 'error'">
      <BlockDeployment reason="architectural-violation" />
      <NotifyTeam channel="alerts" priority="high" />
    </When>
    <When condition="severity === 'warn'">
      <QueueWorkflow name="steward-autofix" />
    </When>
  </On>

  {/* Performance thresholds */}
  <On event="performance.degradation">
    <Measure baseline="last7days" />
    <When condition="p99 > baseline * 1.2">
      <TriggerWorkflow name="performance-investigation" />
      <ScaleResources target="compute" factor={1.5} />
    </When>
  </On>

  {/* Developer experience events */}
  <On event="developer.frustration" rating="😟">
    <AnalyzeContext window="PT15M" />
    <SuggestImprovements category="tooling" />
    <TrackResolution workflow="dev-experience-fix" />
  </On>

  {/* External API events */}
  <On event="webhook.received">
    <ValidatePayload schema="github-webhook" />
    <AuthenticateSource />
    <RouteToWorkflow based="payload.action" />
  </On>

  {/* Scheduled triggers */}
  <On schedule="0 2 * * *" timezone="UTC">
    <TriggerWorkflow name="daily-health-check" />
    <CleanupResources olderThan="P30D" />
  </On>
</WorkflowTriggers>
```

### Distributed Workflow Orchestration

Coordinate complex, multi-stage workflows across distributed systems:

```tsx
<DistributedWorkflow id="code-quality-pipeline">
  <Phases>
    <Phase name="parse" executor="arborist">
      <Input type="source-files" />
      <Output type="ast-data" />
      <Parallelization maxConcurrency={4} />
      <Timeout>PT3M</Timeout>
    </Phase>
    
    <Phase name="validate" executor="warden">
      <Input type="ast-data" />
      <Output type="violations" />
      <DependsOn phase="parse" />
      <RetryPolicy attempts={2} backoff="linear" />
    </Phase>
    
    <Phase name="test-generation" executor="auditor">
      <Input type="ast-data" />
      <Output type="test-results" />
      <Parallel with="validate" />
      <ResourceLimits memory="2GB" cpu="4 cores" />
    </Phase>
    
    <Phase name="documentation" executor="envoy">
      <Input type="ast-data" />
      <Input type="test-results" />
      <Output type="documentation" />
      <DependsOn phase="test-generation" />
      <CacheStrategy key="source-hash" ttl="PT1H" />
    </Phase>
  </Phases>
  
  <ErrorHandling>
    <OnFailure phase="parse" retry={3} backoff="exponential" />
    <OnFailure phase="validate" escalate="human-review" />
    <OnTimeout after="PT10M" cancel="gracefully" />
    <OnCancel cleanup="intermediate-artifacts" />
  </ErrorHandling>
  
  <Monitoring>
    <PhaseMetrics />
    <ResourceUsage />
    <DurationTracking />
    <ErrorRates />
  </Monitoring>
</DistributedWorkflow>
```

### Real-Time Event Processing

Process events as they flow through the system with reactive transformations:

```tsx
<EventProcessingPipeline>
  <Stream name="git-events">
    <Subscribe to="git.*" />
    <Transform>
      <ExtractMetadata fields={["author", "files", "branch"]} />
      <EnrichWithContext from="user-profile" />
      <ClassifyImpact based="file-importance" />
    </Transform>
    <Buffer size={100} flushInterval="PT5S" />
  </Stream>
  
  <Stream name="performance-events">
    <Subscribe to="metrics.*" />
    <Window type="sliding" size="PT5M" slide="PT30S" />
    <Aggregate>
      <Average field="latency" />
      <Percentile field="response-time" values={[50, 90, 99]} />
      <Count field="errors" />
    </Aggregate>
    <Detect>
      <Anomaly field="latency" threshold="3-sigma" />
      <Trend field="error-rate" direction="increasing" />
    </Detect>
  </Stream>
  
  <Stream name="workflow-events">
    <Subscribe to="workflow.*" />
    <Fork>
      <Left>
        <Filter condition="event.type === 'completed'" />
        <UpdateMetrics category="workflow-performance" />
      </Left>
      <Right>
        <Filter condition="event.type === 'failed'" />
        <TriggerIncidentResponse />
        <NotifyOnCall />
      </Right>
    </Fork>
  </Stream>
</EventProcessingPipeline>
```

### Workflow State Management

Maintain workflow execution state with automatic persistence and recovery:

```tsx
<WorkflowStateManager>
  <PersistenceStrategy>
    <Checkpoints>
      <AutoSave interval="PT30S" />
      <StateSnapshot on="phase-completion" />
      <IncrementalBackup on="significant-change" />
    </Checkpoints>
    
    <Storage>
      <TripleStore for="metadata" />
      <LocalStorage for="intermediate-results" />
      <DistributedCache for="shared-state" />
    </Storage>
  </PersistenceStrategy>
  
  <RecoveryPolicies>
    <OnCrash>
      <RestoreFromLastCheckpoint />
      <ReplayMissedEvents since="last-checkpoint" />
      <ValidateStateConsistency />
      <ResumeExecution from="safe-point" />
    </OnCrash>
    
    <OnNetworkPartition>
      <QueueOperations locally={true} />
      <ConflictResolutionOnReconnect strategy="crdt-merge" />
      <StateReconciliation with="distributed-peers" />
    </OnNetworkPartition>
    
    <OnResourceExhaustion>
      <PauseNonCriticalWorkflows />
      <ScaleResources if="auto-scaling-enabled" />
      <SpillOverToDistributedNodes />
    </OnResourceExhaustion>
  </RecoveryPolicies>
</WorkflowStateManager>
```

### Event-Driven Integration Patterns

Connect external systems through standardized event interfaces:

```tsx
<ExternalIntegrations>
  <GitHubIntegration>
    <Webhooks>
      <On event="push" />
      <On event="pull_request" />
      <On event="release" />
    </Webhooks>
    
    <EventTransformation>
      <Normalize payload="github-format" to="sitebender-format" />
      <ExtractRelevantData fields={["repository", "commit", "author"]} />
      <ValidateIntegrity signature="x-hub-signature" />
    </EventTransformation>
  </GitHubIntegration>
  
  <SlackIntegration>
    <Commands>
      <Command name="deploy" workflow="production-deployment" />
      <Command name="rollback" workflow="emergency-rollback" />
      <Command name="status" query="system-health" />
    </Commands>
    
    <Notifications>
      <WorkflowStarted channel="deployments" />
      <WorkflowCompleted channel="deployments" />
      <WorkflowFailed channel="alerts" />
    </Notifications>
  </SlackIntegration>
  
  <MonitoringIntegration>
    <AlertManager>
      <Subscribe to="alerts.*" />
      <Route>
        <Critical to="pager-duty" />
        <Warning to="team-slack" />
        <Info to="monitoring-dashboard" />
      </Route>
    </AlertManager>
    
    <MetricsCollection>
      <Publish to="prometheus" interval="PT15S" />
      <Publish to="datadog" interval="PT30S" />
      <Publish to="grafana" format="json" />
    </MetricsCollection>
  </MonitoringIntegration>
</ExternalIntegrations>
```

### Workflow Composition and Reuse

Build complex workflows from composable, reusable components:

```tsx
<WorkflowLibrary>
  <WorkflowTemplate name="secure-deployment">
    <Parameters>
      <Parameter name="environment" type="string" enum={["staging", "production"]} />
      <Parameter name="approvalRequired" type="boolean" default={true} />
      <Parameter name="rollbackWindow" type="duration" default="PT15M" />
    </Parameters>
    
    <Stages>
      <Stage name="security-scan" />
      <Stage name="approval-gate" if="${approvalRequired}" />
      <Stage name="deployment" />
      <Stage name="smoke-tests" />
      <Stage name="monitoring" duration="${rollbackWindow}" />
    </Stages>
  </WorkflowTemplate>
  
  <WorkflowTemplate name="data-processing">
    <Parameters>
      <Parameter name="inputSource" type="url" required={true} />
      <Parameter name="outputFormat" type="string" enum={["json", "csv", "parquet"]} />
      <Parameter name="batchSize" type="integer" default={1000} />
    </Parameters>
    
    <Processing>
      <Extract from="${inputSource}" />
      <Transform using="custom-logic" />
      <Load to="data-warehouse" format="${outputFormat}" batchSize="${batchSize}" />
    </Processing>
  </WorkflowTemplate>
  
  <WorkflowComposition>
    <Use template="secure-deployment" environment="production" />
    <Use template="data-processing" outputFormat="parquet" />
    <Connect output="data-processing.result" input="secure-deployment.artifact" />
  </WorkflowComposition>
</WorkflowLibrary>
```

### Performance and Scalability

Operator's workflow engine is designed for high-performance, distributed execution:

#### Event Processing Performance
- **Local events**: < 1μs latency
- **Distributed events**: < 10ms latency (same region)
- **Workflow triggers**: < 5ms cold start
- **Throughput**: 1M+ events/second (local), 100K+ events/second (distributed)

#### Scalability Features
```tsx
<ScalabilityFeatures>
  <HorizontalScaling>
    <AutoScale based="queue-depth" />
    <LoadBalancing algorithm="consistent-hashing" />
    <NodeDiscovery via="agent.peers" />
  </HorizontalScaling>
  
  <ResourceManagement>
    <ResourcePools cpu="4-16 cores" memory="2-32GB" />
    <QueueManagement backpressure="adaptive" />
    <CircuitBreakers for="external-services" />
  </ResourceManagement>
  
  <OptimizationStrategies>
    <EventBatching size="dynamic" />
    <ResultCaching ttl="intelligent" />
    <DeadLetterQueues for="failed-events" />
  </OptimizationStrategies>
</ScalabilityFeatures>
```

This transforms Operator from a simple pub/sub system into a **distributed workflow orchestration engine** that rivals enterprise solutions while maintaining Sitebender's semantic-first, "everything is data" philosophy.

## API Reference

See the [API documentation](https://sitebender.studio/operator/api) for complete component and function references.

## License

MIT
