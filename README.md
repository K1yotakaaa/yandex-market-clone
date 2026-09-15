# yandex-market-clone

A simplified **Yandex Market** clone, built as a **Web Programming course** project.

---

## Overview

A **microfrontend architecture**: one shell (host) composes several independent remotes, each loaded over HTTP at runtime via Module Federation. Each piece builds and fails independently — a broken remote cannot take down the shell.

---

## Architecture

```
                    ┌────────────────────────┐
                    │     SHELL (host)       │
                    │     localhost:5000     │
                    │                        │
                    │  - layout, routing     │
                    │  - Redux store         │
                    │  - env switcher        │
                    │  - error boundaries    │
                    └───────────┬────────────┘
                                │
              loads at runtime via Module Federation
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│   HEADER      │      │   BANNERS     │      │   CATALOG     │
│   :5001       │      │   :5002       │      │   :5003       │
└───────────────┘      └───────────────┘      └───────────────┘
```

Each remote is a full Vite + React app with its own `package.json`, dev server, and build.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Microfrontends | `@module-federation/vite` |
| Monorepo | npm workspaces |
| Parallel dev | `concurrently` |
| State | Redux Toolkit + RTK Query *(coming)* |
| Linting | ESLint (flat config) |

---

## Prerequisites

- Node.js ≥ 20 (tested on 24.16.0)
- npm ≥ 10
- Git

```bash
node -v
npm -v
git --version
```

`.nvmrc` pins Node 24.16.0. With nvm:

```bash
nvm use
```

---

## First-time setup

```bash
git clone https://github.com/K1yotakaaa/yandex-market-clone.git marketplace
cd marketplace
npm install
```

The `marketplace` at the end sets the local folder name — pick whatever you like, but stay consistent with teammates.

Verify workspaces are linked:

```bash
dir node_modules\@marketplace      # Windows
ls node_modules/@marketplace       # macOS/Linux
```

You should see `header` and `shell`.

---

## Running

**Everything in parallel:**

```bash
npm run dev
```

```
[shell]   VITE v8.x  ready in ~300 ms
[shell]   ➜  Local:   http://localhost:5000/
[header]  VITE v8.x  ready in ~280 ms
[header]  ➜  Local:   http://localhost:5001/
```

Open **http://localhost:5000**.

**One app in isolation:**

```bash
npm run dev:shell     # only shell (:5000)
npm run dev:header    # only header (:5001) — also at http://localhost:5001
```

**Other scripts:**

| Command | What it does |
|---|---|
| `npm run typecheck` | `tsc --noEmit` in every workspace |
| `npm run lint` | ESLint in every workspace |
| `npm run build` | Production build of every workspace |

---

## Conventions

- Every workspace's `package.json` name starts with `@marketplace/`
- Every workspace's `tsconfig.json` extends `../../tsconfig.base.json`
- Remotes expose components from `src/index.ts`; shell imports them by `remoteName/ExposedName`
- Remotes never import each other directly — cross-remote communication goes through the shell's store

---

## Development workflow

Each session:

```bash
git checkout dev
git pull
npm install          # only if package.json changed
npm run dev
```

Working on a single remote:

```bash
npm run dev:header
```

Iterate at `http://localhost:5001`, then run `npm run dev` to see it in the shell.

### Adding a dependency

Always target a specific workspace:

```bash
npm install <package> -w @marketplace/shell
npm install <package> -w @marketplace/header
```

**Never** run `npm install` from inside `apps/shell/` — it creates a nested `node_modules` and breaks hoisting.

---

## Git workflow

Two long-lived branches, both protected:

| Branch | Purpose |
|---|---|
| `main` | Stable, deployable |
| `dev` | Active integration — where features land first |

**Flow:** feature branch → PR into `dev` → once stable, `dev` → PR into `main`.

### Branch naming

| Type | Pattern | Example |
|---|---|---|
| Feature | `feat/<desc>` | `feat/header-search-bar` |
| Bug fix | `fix/<desc>` | `fix/remote-boundary-fallback` |
| Chore | `chore/<desc>` | `chore/add-lint-staged` |
| Docs | `docs/<desc>` | `docs/update-readme` |
| Refactor | `refactor/<desc>` | `refactor/split-shared-state` |

Lowercase, hyphen-separated, short.

### Daily flow

```bash
git checkout dev
git pull
git checkout -b feat/header-search-bar

# ...work...
git add apps/remotes/header/src/SearchBar.tsx
git commit -m "feat(header): add search input with placeholder"

git push -u origin feat/header-search-bar
```

Then open a **Pull Request** on GitHub targeting `dev`:
- **Title** matches the commit style
- **Description:** what changed, why, how you tested it

At least **one teammate approves** before merge.

### Commit format

```
<type>(<scope>): <short description>
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`

Scope is usually the workspace: `shell`, `header`, `banners`, `catalog`, `shared-types`, `repo`.

Examples:

```
feat(header): add search input
fix(shell): correct RemoteBoundary fallback text
chore(repo): switch from turbo to concurrently
docs(readme): add git workflow section
```

Rules: imperative mood ("add", not "added"), lowercase after colon, no trailing period, one logical change per commit.

### Syncing with `dev`

```bash
git checkout dev
git pull
git checkout feat/your-branch
git merge dev
```

Resolve conflicts, commit, push.

### Pre-PR checklist

```bash
npm run typecheck
npm run lint
npm run dev
```

- [ ] Type-check passes
- [ ] Lint passes
- [ ] App runs at `http://localhost:5000`
- [ ] Change works and didn't break the shell
- [ ] No stray `console.log`

---

## Adding a shared package

**1. Create the folder:**

```bash
mkdir packages/shared-thing
cd packages/shared-thing
```

**2. `package.json`:**

```json
{
  "name": "@marketplace/shared-thing",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "scripts": { "typecheck": "tsc --noEmit" }
}
```

`main` points to a `.ts` file — Vite handles that in dev. No build step while all consumers are in the monorepo.

**3. `tsconfig.json`:**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "noEmit": true },
  "include": ["src"]
}
```

**4. Create `src/index.ts`** and export from it.

**5. Link it:**

```bash
npm install
```

**6. Consume it:**

```bash
npm install @marketplace/shared-thing -w @marketplace/shell
```

```ts
import { something } from '@marketplace/shared-thing';
```