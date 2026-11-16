<div align="center">

<img src="docs/kertomus-banner.webp" alt="Kertomus — Your Story Studio" width="860" />

# Kertomus

**Your story deserves a studio, not five browser tabs.**

A free, open-source, local-first AI writing studio for Windows, macOS and Linux.
Kertomus is the **former OpenPlot AI, former Inkwell** — the same local studio,
with a name that finally fits.

Chat with any model, keep your canon in a structured story bible, outline in
three acts, write chapters, and watch the book grow — in one desktop window.

[**Download**](https://github.com/mahakammoonlightstudio-beep/Kertomus/releases/latest) ·
[Website](https://mahakammoonlightstudio-beep.github.io/Kertomus/) ·
[Handbook](docs/HANDBOOK.md) ·
[Panduan (ID)](docs/HANDBOOK.id.md) ·
[Changelog](CHANGELOG.md) ·
[Security](SECURITY.md)

[![Release](https://img.shields.io/github/v/release/mahakammoonlightstudio-beep/Kertomus?style=flat-square)](https://github.com/mahakammoonlightstudio-beep/Kertomus/releases)
[![CI](https://img.shields.io/github/actions/workflow/status/mahakammoonlightstudio-beep/Kertomus/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/mahakammoonlightstudio-beep/Kertomus/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/mahakammoonlightstudio-beep/Kertomus?style=flat-square)](LICENSE)
[![Downloads](https://img.shields.io/github/downloads/mahakammoonlightstudio-beep/Kertomus/total?style=flat-square&logo=github)](https://github.com/mahakammoonlightstudio-beep/Kertomus/releases)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-e3ae43?style=flat-square)
![Electron](https://img.shields.io/badge/Electron-33-47848F?logo=electron&logoColor=white&style=flat-square)
![Local-first](https://img.shields.io/badge/local--first-no%20telemetry-2ea043?style=flat-square)

</div>

---

## Start here

| If you want to… | Go to |
| --- | --- |
| Install it and write something tonight | [Install](#install) |
| Learn the whole studio, properly | [Handbook](docs/HANDBOOK.md) · [Panduan](docs/HANDBOOK.id.md) |
| Bring your own model | [Bring your own model](#bring-your-own-model) |
| Check a Linux download | [Verify a Linux download](#verify-a-linux-download) |
| Build from source or run the tests | [Build from source](#build-from-source) |
| See every change in this release | [CHANGELOG.md](CHANGELOG.md) |

The in-app **Guide** is the same handbook, searchable from `F1` or the sidebar.
The English and Indonesian editions are generated from the same source, so the
desk you are looking at and the page you are reading do not drift apart.

## The room where the book happens

Most AI writing tools give you a chat box and hope. Kertomus gives the model
your actual story — and gives you the room to shape it.

| | |
| --- | --- |
| **One window, one project** | Chat, Story Bible, outline board, chapters and statistics share the same project. No copy-pasting canon between tabs, no “which doc has the latest version?” |
| **Canon that is data, not a prompt** | Worlds, locations, characters, items and lore are real records with tags, links and reference files. The agent reads all of it with native tools. |
| **The model you already pay for** | OpenAI, Anthropic, OpenRouter, Groq, Ollama, LM Studio, or any OpenAI-compatible `/v1` endpoint. One provider card per service, any model per chat. |
| **Local by default** | SQLite on your disk, keys in the OS credential vault, no account, no cloud sync, no telemetry. The renderer cannot even open a socket. |

## New in 1.3.1

**The Kertomus edition — a new name, three real desks, and one shelf that is not
in the catalogue.**

- **OpenPlot AI is now Kertomus.** New mark, wordmark, window and menu titles,
  installer identity (`studio.kertomus.app`) and About plate. Your existing
  studio is copied into the new profile on first launch; the original is left
  untouched.
- **The rooms edition.** Settings now remembers whether you came from Chat,
  Agent or Writing and returns you there. Writing’s sidebar grew a novel tree
  (chapters and project chats together), Writing opens on a shelf of books, and
  Agent opens on a workbench with tools, skills, MCP status and recent sessions.
- **Scriptorium & Parchment.** The default `system` theme is a lamp-lit ink room
  at night and warm paper by day, with bookbinding gold as the accent. Sixteen
  themes and eleven accents remain; **Settings → Appearance** has a one-click
  studio palette preset.
- **More voices.** Japanese (beta) and Pirate English (beta) join the studio,
  English 1700s (beta) is derived from the whole English dictionary, and Spanish
  and Hindi grew from 429 to 601 strings.
- **Writing sprints.** Pick 10, 15, 25 or 50 minutes on the manuscript desk and
  watch the words you add. No lock-in, no streak pressure.
- **The Seventh Shelf.** A hidden short story with no catalogue number. Type the
  studio’s name when no field has focus, or look at the very bottom of About.
  It touches no data and unlocks nothing.
- **Signed Linux builds.** Every AppImage and tarball gets a detached `.asc`
  signature, and each architecture gets a signed `SHA256SUMS-linux-x64` or
  `SHA256SUMS-linux-arm64`. See [Verify a Linux download](#verify-a-linux-download).
- **Under the hood.** Profile and database migration, version drift in the
  MCP/HTTP user agent, EPUB language tags for Japanese, derived accent ink for
  readable labels, localized chapter names, and the last hard-coded English
  dialogs are fixed.

Everything from 1.3.0 is still here: separate libraries with Time Machine
snapshots, portable `.db` export, `Ctrl/Cmd+P` quick switch, the Revision
Timeline, Skill Lab, MCP, automations and the full appearance system.

[The complete release notes, including every fix and documentation change →](CHANGELOG.md#131--2026-11-16)

## What the studio does

### Chat

- **Multi-provider, multi-model.** Pick a different model for every chat, with
  streaming replies, reasoning traces, per-message tokens and a model-health
  strip.
- **Reply styles.** Builtin personas (Default, Concise, Explanatory, Editorial,
  Empathetic, Formal) or your own, injected as a system fragment.
- **Agent tools.** The model can read the whole Story Bible in one call, search
  entries, create or update canon, write and append chapters, and save
  memories — with write actions refreshing the Bible immediately.
- **A prompt library.** `/` templates with `{placeholders}`, `@`-mentions that
  expand entries and chapters into context, edit-and-resend, regenerate,
  delete, and Markdown export.
- **Files in the chat.** Attach up to 8 files per message; they become cards
  you can read before sending, stay in the transcript, and open in a popup
  after a restart.
- **Context guard.** Old turns are trimmed from the request when a chat exceeds
  the model’s window; nothing is deleted from the transcript.

### Canon and writing

- **Story Bible** — worlds, locations, characters, items and lore with tags,
  cross-links, full-text search, per-category counts, reference files and bulk
  import from Markdown, JSON or CSV.
- **Chapters** — draft / revising / done, reading-order reordering, focus mode,
  a scene board, and version history (snapshots on save, before an AI append
  and before a restore; the last 30 are kept).
- **Story Flow** — a three-act board of beats linked to chapters.
- **Plot Smith** — a guided four-step story agent (brief → premises → cast &
  world → three-act outline) that can create the whole project in one click.
- **Writing statistics** — daily goal, current and best streak, weekly totals, a
  90-day heatmap, per-project stakes and an AI arc analysis.

### Extensions — with a gate

- **Skills.** Nine builtin skills across Chat, Agent and Writing, plus your own.
  A new skill starts disabled; switch any skill off per chat.
- **Plugins.** JavaScript lifecycle hooks and palette commands, with full Node
  access. They run only after you approve that exact code.
- **MCP bridge.** Enabled stdio servers are spawned, handshaken, listed and
  callable as `mcp__{server}__{tool}`, with status, restart and logs. An MCP
  definition is an arbitrary local command — it runs only after approval.
- **Automations.** Seven triggers and nine actions with per-row **Test**, a run
  history and loop guards.

## Bring your own model

| Provider | Base URL |
| --- | --- |
| OpenAI | `https://api.openai.com/v1` |
| Anthropic | `https://api.anthropic.com/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Ollama | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |

Open **Settings → AI Providers → Add provider**, paste the key, run **Fetch
models**, then choose a model in the chat header. Ollama and LM Studio need no
key. A `404 model not found` from the model list still counts as a valid key, so
hosted gateways that reject probe models work too.

## Install

Prebuilt binaries for **v1.3.1** are attached to the
[GitHub releases](https://github.com/mahakammoonlightstudio-beep/Kertomus/releases).
Each platform has a full installer/app and a portable folder build.

| Platform | Full app | Folder |
| --- | --- | --- |
| Windows | `Kertomus-1.3.1-win-x64.exe` (NSIS installer) | `Kertomus-1.3.1-win-x64.zip` |
| macOS | `Kertomus-1.3.1-mac-universal.dmg` (universal) | `Kertomus-1.3.1-mac-universal.zip` / `Kertomus-1.3.1-mac-arm64.zip` |
| Linux (x64) | `Kertomus-1.3.1-linux-x64.AppImage` | `Kertomus-1.3.1-linux-x64.tar.gz` |
| Linux (arm64) | `Kertomus-1.3.1-linux-arm64.AppImage` | `Kertomus-1.3.1-linux-arm64.tar.gz` |

The macOS disk image and the main macOS zip are universal (Intel + Apple
silicon); the `mac-arm64` zip is smaller and Apple-silicon only.

Every Linux AppImage release also ships a matching `.zsync` file for
[AppImageUpdate](https://github.com/AppImageCommunity/AppImageUpdate) delta
downloads.

### Verify a Linux download

Linux release artifacts are signed by the release workflow. Import the project
key once, then verify both the manifest and the artifact:

```bash
curl -LO https://raw.githubusercontent.com/mahakammoonlightstudio-beep/Kertomus/main/docs/keys/kertomus-release.asc
gpg --import kertomus-release.asc
gpg --fingerprint "Kertomus Releases"   # fingerprint below

arch=x64   # or arm64
gpg --verify SHA256SUMS-linux-$arch.asc
sha256sum --check SHA256SUMS-linux-$arch
```

Each AppImage and tarball also has a detached `.asc` signature, so a single
file can be checked without the manifest:

```bash
gpg --verify Kertomus-1.3.1-linux-x64.AppImage.asc \
  Kertomus-1.3.1-linux-x64.AppImage
```

Release key fingerprint:

```text
A840 1FF4 C843 1BF2 081B  0DE2 77C5 8650 CE5E F7A7
```

The key belongs to **Kertomus Releases** and expires on 2028-11-15. The private
key lives only in the repository’s `LINUX_GPG_PRIVATE_KEY` /
`LINUX_GPG_PASSPHRASE` Actions secrets; it is never committed or shipped. A
rotation is documented in [docs/keys/README.md](docs/keys/README.md). Without
the secrets the Linux build still succeeds and ships unsigned — it does not
fail the release.

## Build from source

Requirements: **Node.js 18+** and npm.

```bash
npm install          # install dependencies
npm run dev          # Vite + Electron, hot reload
npm run typecheck    # TypeScript, no emit
npm run build        # renderer bundle + main-process compile
npm start            # run the built app
npm test             # headless suite
npm run test:e2e     # headless + GUI end-to-end

npm run dist:win     # Windows NSIS + zip
npm run dist:linux   # Linux x64 AppImage + tar.gz
npm run dist:mac     # macOS dmg + zip
```

The release workflow also cross-builds Linux **arm64** AppImage and tarball
(`Kertomus-<version>-arm64.*`); `npm run dist:linux` locally stays x64.

macOS builds are signed with the hardened runtime and notarized automatically
when the repository has `MAC_CERT_P12`, `MAC_CERT_PASSWORD`, `APPLE_ID`,
`APPLE_APP_SPECIFIC_PASSWORD` and `APPLE_TEAM_ID` secrets. Without them the
macOS build is unsigned and Gatekeeper asks you to open it once.

DevTools stay closed in development; set `OPENPLOT_DEVTOOLS=1` to open them.

## Tests

`npm test` runs the headless group — mock HTTP servers and temp SQLite
databases, no GUI, no real keys. It rebuilds `dist-electron` when
`electron/*.ts` is newer than the build output.

```bash
npm test                                  # headless (~2 min)
npm run test:e2e                          # + Vite/Electron GUI groups
node scripts/run-all-tests.mjs --list     # list every group
node scripts/run-all-tests.mjs --include=e2e-attach   # drive a RUNNING app (:9222)
```

| Group | What it covers |
| --- | --- |
| `headless` | DB and migrations, engine and parsers, tools, prompt assembly, guide, MCP, security, approvals, perf and bundle budgets, fuzz |
| `e2e-local` | boots its own Vite + Electron in an isolated profile: chat/tools/prompts, keyboard focus, studio UX, hostile-markdown XSS |
| `e2e-attach` | drives an already-running dev app over CDP (skipped when it is not running) |
| `manual` | real installed app / real profile / packaged build; only with an explicit flag |

## Project map

```text
electron/          main process: database, providers, tools, plugins, MCP,
                   files, images, approvals, IPC
src/               React renderer
  components/      one file per view + chat/ and settings/ subfolders
  lib/             pure testable logic (prompt, imports, paging, progress)
  guide/           bundled English + Indonesian handbook
  styles/          ordered CSS partials
scripts/           headless, UI-render, GUI and end-to-end tests
docs/              handbook, plugin API, keys, stress notes, website
```

Every file, what it owns, and the invariants that keep it safe are listed in
[CONTRIBUTING.md](CONTRIBUTING.md#file-map). Read that before renaming or moving
something under `electron/`.

## Privacy and security

Kertomus stores its database in the OS user-data path
(`%APPDATA%/Kertomus` on Windows, `~/Library/Application Support/Kertomus`
on macOS, `~/.config/Kertomus` on Linux). On the first 1.3.1 launch the old
`openplot-ai` profile is copied into this folder once; the original is left
untouched. Uninstalling does not delete either folder;
**Settings → Data** can reset everything, including memories and chapters.

Provider API keys and the web-search key are encrypted at rest with the OS
credential vault when available (DPAPI, Keychain or libsecret). The web-search
key is also redacted from every renderer reply; the UI learns only that a key is
stored. There is no account, no analytics and no background update ping.
Attachments are read only through grants, `web_fetch` refuses private addresses
both by hostname and by the DNS answer it actually connects to, and plugins/MCP
run only after explicit approval.

Portable library copies deliberately strip provider keys, the web-search key,
MCP environment variables and stored execution approvals. See
[SECURITY.md](SECURITY.md#data-at-rest) for the full boundary.

The full threat model, scope, hardening details and disclosure timeline are in
[**SECURITY.md**](SECURITY.md). To report a vulnerability, email
[mr.fauzan121314@gmail.com](mailto:mr.fauzan121314@gmail.com) — please do not
open a public issue.

## Documentation

- [Handbook](docs/HANDBOOK.md) · [Panduan (ID)](docs/HANDBOOK.id.md)
- [Security policy](SECURITY.md)
- [Contributing and file map](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Plugin API](docs/PLUGIN_API.md)
- [Linux release key](docs/keys/README.md)
- [Stress test notes](docs/STRESS_TEST.md)

## There is a seventh shelf

It is not in the sidebar. It is not in the handbook. It is a short story, and it
is exactly where it wants to be. If you type the studio’s name while no field has
focus, that is between you and the shelf. We will not be taking questions.

## License

[MIT](LICENSE) — Mahakam Moonlight Studio.

## Support

Development is funded through
[PayPal](https://www.paypal.com/paypalme/mrfozan),
[SociaBuzz](https://sociabuzz.com/mahakam_moonlight_studio/tribe) and
[Saweria](https://saweria.co/MahakamMoonStudio). Starring the repo, filing a
clear bug report and telling another writer about it help just as much.
