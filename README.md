# portfolio-2025

A self-dogfooding, fully automated testing gauntlet project. Designed to evolve from simple code evaluation to a full production-grade CI/CD pipeline with modular quality gates and automated enforcement.

## Phase 1: Core Testing Engine (MVP)

- [x] Create a simple CLI or web API to accept code input (Fastify + `vm2`).

- [x] Implement Unit Testing (JS/tape).

- [x] Build Red/Green Feedback Output (via CLI and CI pipeline results).

- [x] Optional: JSON output for future API consumption.

## Phase 2: Expand Gauntlet

- [x] Integration Tests: Verify API endpoints with real HTTP calls.

- [ ] E2E Tests: Simulate full real-world workflows (e.g., UUID generation through API + result validation).

- [ ] Security Checks:

  - [x] Integrate ESLint for static analysis.

  - [ ] Add Snyk or Trivy for dependency and container scans.

- [ ] Performance Benchmarks:

  - [ ] Add `autocannon`, `wrk`, or `k6` to measure API response times under load.

  - [ ] Define baseline thresholds and fail builds on degradation.

- [ ] Enhance Reporting:

  - [ ] Track and output test results in JSON for easy dashboard integration.

  - [ ] (Optional) Implement a basic CLI/dashboard summary.

## Phase 3: CI/CD Integration

- [x] Add GitHub Actions pipeline with matrix testing across Node.js versions.

- [x] Trigger gauntlet on PR creation and code pushes.

- [ ] Add Status Badges (Build Status, Test Coverage) to README.

- [ ] Implement Notifications:

  - [ ] Slack, Email, or Webhook alerts for failed pipelines.

## Phase 4: Live Dogfooding

- [ ] Build or migrate a real web app to be fully maintained through this pipeline.

- [ ] Infrastructure-as-Code (Terraform or Pulumi) for deployment environments.

- [ ] Bonus: Add automatic rollback if a deployment fails post-gauntlet.

- [ ] Bonus: Build a “Code Quality Dashboard” visualizing historical pipeline health, performance benchmarks, and test coverage.

## Stretch Goals (Nice-to-Haves)

- [ ] Add Docker and Kubernetes support for on-demand execution environments.

- [ ] Implement Test-Driven Infrastructure concepts.

- [ ] Explore additional language sandboxes beyond JavaScript (e.g., Python, WASM).
