# portfolio-2025

## Phase 1: Core Testing Engine (MVP)

- [x] Create a simple CLI or web API to accept code input.

- [x] Implement Unit Testing (start with bash/BATS or JS/tape for familiarity).

- [x] Build Red/Green Feedback Output (CLI colors or simple HTML report).

- [x] Optional: Add JSON output for future API consumption.

## Phase 2: Expand Gauntlet

- [x] Integration Tests: Add simple dependency checks or API call validations.

- [ ] E2E Tests: Simulate real-world workflows (use a sample app).

- [ ] Security Tests: Integrate Snyk API or trivy for container scans.

- [ ] Performance Tests: Add hey, wrk, or k6 for API performance benchmarks.

- [ ] Track each test result clearly in the output.

## Phase 3: CI/CD Integration

- [ ] Add GitHub Actions pipeline (or GitLab/Jenkins).

- [ ] Trigger gauntlet on PR creation and code pushes.

- [ ] Add Status Badges (Red/Green, Test Coverage).

- [ ] Implement Slack/Email/Webhook Notifications for failures.

## Phase 4: Live Dogfooding

- [ ] Build or migrate a real webapp to be fully maintained through this pipeline.

- [ ] Infrastructure-as-Code (Terraform or Pulumi?) for deploy environments.

- [ ] Bonus: Add automatic rollback if a deploy fails gauntlet post-release.

- [ ] Bonus: Add a “Code Quality Dashboard” with history and visualizations.

