# Activity Tracking

Event logging, audit trails, and behavioral analytics captured through database triggers and functions.

## Philosophy

**Comprehensive Observability**: Every significant user action and system event is captured automatically at the database level, providing complete audit trails and behavioral insights.

## Event Logging System

### Core Activity Log

Centralized event tracking for all user and system activities:

```sql
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Event identification
  event_type activity_event_type NOT NULL,  -- 'user_action', 'system_event', 'data_change'
  action TEXT NOT NULL,                     -- 'create', 'update', 'delete', 'login', etc.
  entity_type TEXT,                         -- 'post', 'user', 'comment', etc.
  entity_id UUID,                           -- ID of affected entity
  
  -- Context
  user_id UUID REFERENCES users(id),       -- Acting user (NULL for system events)
  session_id UUID REFERENCES user_sessions(id),
  
  -- Request context
  ip_address INET,
  user_agent TEXT,
  request_id UUID,                          -- For request correlation
  
  -- Event data
  event_data JSONB,                         -- Flexible event-specific data
  metadata JSONB,                           -- Additional context
  
  -- Timing
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Indexing for queries
  CONSTRAINT chk_entity_consistency CHECK (
    (entity_type IS NOT NULL AND entity_id IS NOT NULL) OR
    (entity_type IS NULL AND entity_id IS NULL)
  )
);

-- Efficient querying
CREATE INDEX idx_activity_log_user_time ON activity_log(user_id, created_at DESC);
CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id, created_at DESC);
CREATE INDEX idx_activity_log_action_time ON activity_log(action, created_at DESC);
```

### Automatic Data Change Tracking

Database triggers capture all data modifications:

```sql
-- Generic audit trigger function
CREATE OR REPLACE FUNCTION log_data_change()
RETURNS TRIGGER AS $$
DECLARE
  event_data JSONB;
  change_type TEXT;
BEGIN
  -- Determine change type
  IF TG_OP = 'INSERT' THEN
    change_type = 'create';
    event_data = to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    change_type = 'update';
    event_data = jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW),
      'changed_fields', get_changed_fields(OLD, NEW)
    );
  ELSIF TG_OP = 'DELETE' THEN
    change_type = 'delete';
    event_data = to_jsonb(OLD);
  END IF;
  
  -- Log the change
  INSERT INTO activity_log (
    event_type,
    action,
    entity_type,
    entity_id,
    user_id,
    event_data
  ) VALUES (
    'data_change',
    change_type,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    current_user_id(),
    event_data
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply to important tables
CREATE TRIGGER posts_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON posts
  FOR EACH ROW EXECUTE FUNCTION log_data_change();

CREATE TRIGGER users_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW EXECUTE FUNCTION log_data_change();
```

## User Behavior Analytics

### Session Tracking

Detailed session activity monitoring:

```sql
CREATE TABLE user_activity_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  session_id UUID REFERENCES user_sessions(id),
  
  -- Session summary
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  
  -- Activity metrics
  page_views INTEGER NOT NULL DEFAULT 0,
  actions_performed INTEGER NOT NULL DEFAULT 0,
  content_created INTEGER NOT NULL DEFAULT 0,
  content_modified INTEGER NOT NULL DEFAULT 0,
  
  -- Engagement metrics
  scroll_depth_avg NUMERIC(5,2),  -- Average scroll percentage
  time_on_page_avg INTEGER,       -- Average seconds per page
  bounce_rate BOOLEAN,            -- Single page session
  
  -- Technical context
  device_type TEXT,
  browser_type TEXT,
  referrer_url TEXT,
  
  -- Geographic context (privacy-aware)
  country_code CHAR(2),
  timezone TEXT
);
```

### Content Engagement

Track how users interact with content:

```sql
CREATE TABLE content_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  
  -- Engagement events
  event_type engagement_event_type NOT NULL,  -- 'view', 'like', 'share', 'comment'
  engagement_value NUMERIC,                   -- Duration, rating, etc.
  
  -- Context
  session_id UUID REFERENCES user_sessions(id),
  referrer_source TEXT,
  device_context JSONB,
  
  -- Timing
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Uniqueness constraints
  UNIQUE(user_id, content_id, content_type, event_type, DATE(occurred_at))
);

-- Aggregated engagement metrics
CREATE MATERIALIZED VIEW content_engagement_summary AS
SELECT 
  content_id,
  content_type,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(*) as total_engagements,
  COUNT(*) FILTER (WHERE event_type = 'view') as views,
  COUNT(*) FILTER (WHERE event_type = 'like') as likes,
  COUNT(*) FILTER (WHERE event_type = 'share') as shares,
  COUNT(*) FILTER (WHERE event_type = 'comment') as comments,
  AVG(engagement_value) FILTER (WHERE event_type = 'view') as avg_view_duration,
  MAX(occurred_at) as last_engagement
FROM content_engagement
GROUP BY content_id, content_type;
```

## Security Monitoring

### Suspicious Activity Detection

Automated detection of unusual patterns:

```sql
-- Rate limiting and anomaly detection
CREATE TABLE security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type security_event_type NOT NULL,  -- 'rate_limit', 'suspicious_login', 'data_breach_attempt'
  severity severity_level NOT NULL,          -- 'low', 'medium', 'high', 'critical'
  
  -- Affected entities
  user_id UUID REFERENCES users(id),
  ip_address INET,
  session_id UUID REFERENCES user_sessions(id),
  
  -- Event details
  description TEXT NOT NULL,
  event_data JSONB,
  automated_response TEXT,                   -- Action taken automatically
  
  -- Resolution
  status event_status NOT NULL DEFAULT 'open',  -- 'open', 'investigating', 'resolved', 'false_positive'
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id),
  resolution_notes TEXT,
  
  -- Timing
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Automatic security monitoring
CREATE OR REPLACE FUNCTION detect_suspicious_activity()
RETURNS TRIGGER AS $$
DECLARE
  recent_failures INTEGER;
  unusual_location BOOLEAN;
BEGIN
  -- Detect multiple failed logins
  IF NEW.event_type = 'failed_login' THEN
    SELECT COUNT(*) INTO recent_failures
    FROM auth_events
    WHERE user_id = NEW.user_id 
      AND event_type = 'failed_login'
      AND created_at > NOW() - INTERVAL '15 minutes';
    
    IF recent_failures >= 5 THEN
      INSERT INTO security_events (
        event_type, severity, user_id, ip_address,
        description, event_data
      ) VALUES (
        'rate_limit', 'medium', NEW.user_id, NEW.ip_address,
        'Multiple failed login attempts detected',
        jsonb_build_object('attempt_count', recent_failures)
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Performance Analytics

### Query Performance Tracking

Monitor database performance patterns:

```sql
CREATE TABLE query_performance_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Query identification
  query_hash TEXT NOT NULL,                 -- Hash of normalized query
  query_type TEXT,                          -- 'SELECT', 'INSERT', 'UPDATE', 'DELETE'
  table_names TEXT[],                       -- Tables accessed
  
  -- Performance metrics
  execution_time_ms NUMERIC NOT NULL,
  rows_examined INTEGER,
  rows_returned INTEGER,
  
  -- Context
  user_id UUID REFERENCES users(id),
  request_id UUID,
  endpoint TEXT,
  
  -- Resource usage
  cpu_time_ms NUMERIC,
  memory_usage_kb INTEGER,
  
  -- Timing
  executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance monitoring views
CREATE VIEW slow_queries AS
SELECT 
  query_hash,
  COUNT(*) as execution_count,
  AVG(execution_time_ms) as avg_time,
  MAX(execution_time_ms) as max_time,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY execution_time_ms) as p95_time
FROM query_performance_log
WHERE executed_at > NOW() - INTERVAL '24 hours'
GROUP BY query_hash
HAVING AVG(execution_time_ms) > 100  -- Queries slower than 100ms
ORDER BY avg_time DESC;
```

## Generated TypeScript Analytics

Type-safe analytics interfaces:

```typescript
// Auto-generated from activity tracking schema
interface ActivityEvent {
  id: string;
  eventType: ActivityEventType;
  action: string;
  entityType?: string;
  entityId?: string;
  userId?: string;
  eventData: Record<string, any>;
  createdAt: Date;
}

interface UserBehaviorMetrics {
  userId: string;
  sessionCount: number;
  totalPageViews: number;
  avgSessionDuration: number;
  contentEngagement: ContentEngagementSummary[];
  lastActivity: Date;
}

// Analytics service with type safety
class AnalyticsService {
  async logUserAction(
    action: string,
    entityType: string,
    entityId: string,
    eventData?: Record<string, any>
  ): Promise<void> {
    // Type-safe activity logging
  }
  
  async getUserBehaviorMetrics(
    userId: string,
    dateRange: DateRange
  ): Promise<UserBehaviorMetrics> {
    // Aggregated user behavior analysis
  }
  
  async getContentEngagement(
    contentId: string,
    contentType: string
  ): Promise<ContentEngagementSummary> {
    // Content performance metrics
  }
  
  async detectAnomalies(
    userId: string
  ): Promise<SecurityEvent[]> {
    // Behavioral anomaly detection
  }
}
```

## Real-Time Monitoring

### Event Streaming

Real-time activity processing:

```sql
-- Enable PostgreSQL logical replication for real-time streaming
CREATE PUBLICATION activity_stream FOR TABLE activity_log, security_events;

-- Notification triggers for immediate alerting
CREATE OR REPLACE FUNCTION notify_security_event()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.severity IN ('high', 'critical') THEN
    PERFORM pg_notify(
      'security_alert',
      json_build_object(
        'event_id', NEW.id,
        'severity', NEW.severity,
        'event_type', NEW.event_type,
        'user_id', NEW.user_id
      )::text
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER security_event_notification
  AFTER INSERT ON security_events
  FOR EACH ROW EXECUTE FUNCTION notify_security_event();
```

### Dashboard Metrics

Real-time dashboard data:

```typescript
interface DashboardMetrics {
  activeUsers: number;
  activeSessions: number;
  contentViews: number;
  securityAlerts: number;
  systemHealth: {
    avgResponseTime: number;
    errorRate: number;
    databaseConnections: number;
  };
}

class MonitoringService {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    // Real-time system metrics
  }
  
  async streamActivityEvents(): AsyncIterator<ActivityEvent> {
    // Real-time activity event stream
  }
}
```

## Data Retention

### Automatic Cleanup

Configurable data retention policies:

```sql
-- Archive old activity logs
CREATE OR REPLACE FUNCTION archive_old_activity_logs()
RETURNS INTEGER AS $$
DECLARE
  archived_count INTEGER;
BEGIN
  -- Move logs older than 1 year to archive table
  WITH archived AS (
    DELETE FROM activity_log
    WHERE created_at < NOW() - INTERVAL '1 year'
    RETURNING *
  )
  INSERT INTO activity_log_archive SELECT * FROM archived;
  
  GET DIAGNOSTICS archived_count = ROW_COUNT;
  
  -- Log the archival
  INSERT INTO activity_log (
    event_type, action, entity_type,
    event_data
  ) VALUES (
    'system_event', 'archive', 'activity_log',
    jsonb_build_object('archived_count', archived_count)
  );
  
  RETURN archived_count;
END;
$$ LANGUAGE plpgsql;

-- Schedule regular cleanup
SELECT cron.schedule('archive-activity-logs', '0 2 * * 0', 'SELECT archive_old_activity_logs();');
```

> **📖 Related Documentation**  
> - **[Access Control](../access-control/index.md)** - Security policies for activity data
> - **[User Identity](../user-identity/index.md)** - User-specific activity tracking
> - **[Data Integrity](../data-integrity/index.md)** - Ensuring reliable audit trails
