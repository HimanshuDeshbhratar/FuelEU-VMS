# AI Agent Workflow Log

## Agents Used
- **Cursor AI Agent** — for complete backend and frontend code generation (React + Node.js + Prisma).
- **GitHub Copilot** — for inline code completions and quick syntax suggestions.
- **ChatGPT (GPT-5)** — for architectural planning, database schema design, Prisma configuration, and debugging.
- **Claude Code** — for refactoring, readability improvements, and inline documentation generation.

---

## Prompts & Outputs

### Example 1 — Backend Architecture Setup
**Prompt:**
> “Generate a clean Node.js + TypeScript backend using hexagonal architecture with routes, compliance, banking, and pooling APIs for the FuelEU Maritime project.”

**Agent Output:**
Cursor generated:
- Folder structure under `/src/core`, `/src/adapters`, `/src/infrastructure`
- Express app and Prisma setup
- TypeScript configuration files

**Validation:**
I verified all created endpoints returned valid JSON responses using Postman.

---

### Example 2 — Database Schema & Prisma Models
**Prompt:**
> “Create PostgreSQL schema and Prisma models for routes, ship_compliance, pools, and bank_entries according to FuelEU regulation.”

**Output:**
Cursor and ChatGPT provided a combined Prisma model and SQL schema.
Prisma models were generated, migrations applied successfully.

**Validation:**
Ran:
```bash
npx prisma migrate dev --name init
npx prisma db seed
