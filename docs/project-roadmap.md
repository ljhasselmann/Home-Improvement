# Project Roadmap

## Objectives
- Provide a single place to plan, budget, and track home improvement work.
- Keep homeowners on top of costs (budget vs. actual) and deadlines.
- Simplify collaboration with contractors through shared timelines and documents.

## Personas
- **Homeowner (primary)**: Plans projects, sets budgets, approves expenses, uploads receipts.
- **Contractor/Designer (collaborator)**: Shares quotes, updates tasks, uploads plans and permits.
- **Household Member (viewer)**: Monitors progress and budget, adds photos/comments.

## MVP User Stories (Inspection-focused)
1. As a homeowner, I can upload an inspection report (PDF or images) and have it ingested.
2. As a homeowner, I receive a prioritized list of recommended projects with short descriptions and severity/urgency indicators.
3. As a homeowner, I can see a simple cost range estimate for each recommended project based on job type and location.
4. As a homeowner, I can see whether a project is DIY-friendly or should involve a contractor.

## Phase Plan
- **Phase 0 – Foundations**
  - Repository scaffolding (frontend + backend), linting, formatting, type-checking pipelines.
  - Auth (email/password + invite-based collaborators) with JWT and roles.
  - Database migrations and seed data for demo projects.
- **Phase 1 – Inspection Ingestion Core**
  - Upload endpoints for PDFs/images with basic validation and storage.
  - OCR/text extraction pipeline and heuristic parsing into structured findings.
  - Severity scoring, DIY vs. contractor flagging, and cost range estimation by job type/location.
- **Phase 2 – Experience Layer**
  - Frontend upload flow with progress state and error handling.
  - Results view showing prioritized recommendations with descriptions, severity, cost ranges, and contractor guidance.
  - Manual adjustments to priority and contractor flag; ability to download the generated summary.
- **Phase 3 – Quality & Enrichment**
  - Feedback loop to refine parsing and scoring; dataset of sample inspection reports.
  - Improved cost estimation inputs (zip code, property type) and clearer confidence indicators.
  - Notifications or exports (PDF/CSV) for sharing results with contractors.

## Acceptance Criteria (MVP)
- Homeowners can upload inspection reports (PDF/images) successfully, with clear validation and error messaging.
- The system extracts findings into a structured list of recommended projects with short descriptions.
- Projects are prioritized by severity/urgency and display whether a contractor is recommended vs. DIY-friendly.
- Each project shows a simple cost range estimate based on job type and location inputs.
- Basic RBAC: project owners vs. collaborators with restricted permissions.

## Risks & Mitigations
- **Data integrity**: Use migrations and foreign keys; enforce business rules in service layer.
- **Document security**: Signed URLs and server-side validation; antivirus scanning in background jobs.
- **Timeline accuracy**: Require task dependencies and validation for overlapping dates.
- **Feature creep**: Track scope via roadmap and ship incrementally.
