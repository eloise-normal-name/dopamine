# Frequently Asked Questions

## GitHub Projects & MCP Integration

### Is `ghcr.io/marioalvial/gh-project-manager-mcp:latest` still needed?

**YES**, the Docker image is still required.

GitHub Copilot does not have native GitHub Projects v2 tools. The MCP (Model Context Protocol) server provided by this Docker image is the only way to enable automated GitHub Projects management for the coding agent and custom agents.

**See:** [MCP Docker Image Analysis](MCP_DOCKER_IMAGE_ANALYSIS.md) for detailed explanation.

### What would break if we removed it?

- ❌ Cannot create issues programmatically
- ❌ Cannot add issues to Project #2
- ❌ Cannot update project custom fields (Priority, Size, Sprint, Status)
- ❌ GitHub Project Manager custom agent becomes non-functional
- ❌ All automated project management workflows stop working

### Are there alternatives?

**No built-in alternatives exist.** Options considered:

1. **GitHub CLI (`gh project`)** - Not integrated with agent tooling, requires manual scripting
2. **Direct GitHub API** - Would require reimplementing all MCP server functionality
3. **Wait for native Copilot support** - Not available as of February 2026

**Recommendation:** Keep the Docker image and monitor GitHub Copilot updates for future native support.

## Audio System

### How do I test audio changes?

Use the three-tier testing approach:
1. **Automated tests**: Run `node shared/utils/audio.test.js`
2. **Manual browser testing**: Open `tests/manual/audio-verification.html`
3. **User verification**: Follow `docs/AUDIO_VERIFICATION_TESTING.md`

### What audio mixing strategy is used?

**Queue-fade** (default). Lower-priority sounds fade out over 100ms when higher-priority sounds play. See `docs/PHASE_1_NOTES.md` for detailed rationale.

## Pattern Detection

### Where are pattern detection rules documented?

Complete rules are in `docs/PATTERN_RULES.md`:
- 5 pattern types: Linear, Scatter, Cluster, Shape, Transform
- Progressive unlock thresholds: 1, 11, 31, 61, 100 spins
- Priority hierarchy for overlapping patterns
- Visual requirements

### How do I test pattern detection?

Run `node shared/utils/pattern.test.js` for automated unit tests. Visual patterns require manual verification in-game.

## Project Organization

### Which project board should I use?

**Project #2** is the main tracking board. All issues should be added with appropriate Priority, Size, and Sprint assignments.

### How do I add issues to the current sprint?

See `docs/ADD_ISSUES_TO_CURRENT_SPRINT.md` for step-by-step instructions using the MCP tools or GitHub CLI.

## Development

### What's the project name?

- **Public name**: "Gobbo Games"
- **Internal/repo name**: "dopamine"

### How do I run the slot machine game?

Open `index.html` in a browser. No build step required for basic development.

For advanced features:
- Audio testing requires HTTPS or localhost
- Pattern detection works immediately
- Mobile mode activates at ≤768px viewport width

## Documentation

### Where do I find complete documentation?

Key documentation locations:
- **Project root**: `README.md`, `ARCHITECTURE.md`, `DESIGN_PRINCIPLES.md`, `CONTRIBUTING.md`
- **Technical**: `docs/TECHNICAL_PLAN_SLOT_MACHINE.md`, `docs/API.md`
- **Design**: `docs/design/` (visual, audio, asset creation)
- **Testing**: `docs/TESTING_STRATEGY.md`, `docs/AUDIO_VERIFICATION_TESTING.md`
- **Operations**: `docs/GITHUB_PROJECTS_CLOUD_OPERATIONS.md`, `docs/MCP_SETUP.md`

See `README.md` for complete documentation index.
