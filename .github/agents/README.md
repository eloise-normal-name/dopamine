# Custom GitHub Copilot Agents

This directory contains custom GitHub Copilot agent profiles for the Dopamine project.

## What are Custom Agents?

Custom agents are specialized AI assistants that you can create to help with specific tasks in your repository. They have custom personalities, knowledge, and purposes defined in YAML configuration files.

## Available Agents

### 📋 GitHub Project Manager

**File:** `github-project-manager.agent.md`

**Purpose:** Manages GitHub Projects (v2) directly, organizing issues, updating project boards, managing sprints, and maintaining project health. Uses MCP (Model Context Protocol) integration to perform actions directly. **Can autonomously delegate work to executor agents.**

**Core Responsibilities:**
- Add issues and PRs to projects with proper metadata
- Update item statuses, priorities, and size estimates
- Organize and plan sprint iterations
- Track project health and identify bottlenecks
- Link related issues and manage dependencies
- Create and manage project items directly
- **Delegate implementation work to Sprint Executor and other agents**
- **Orchestrate multi-issue features across multiple agents**

**Best Used For:**
- Adding new issues to the project board automatically
- Planning and organizing sprints with direct action
- Updating item statuses and priorities
- Project board cleanup and maintenance
- Identifying and updating stale or blocked items
- Generating sprint summaries and reports
- Backlog grooming and prioritization
- **Autonomously executing sprint work by delegating to executors**
- **Managing end-to-end feature delivery with agent orchestration**

**Communication Style:**
- Professional and organized
- Proactive with automatic improvements
- Data-driven with project metrics
- Transparent about actions taken
- Takes direct action via MCP tools

### 🎰 Boomer Casino Critic

**File:** `boomer-casino-critic.agent.md`

**Purpose:** A design critic with a boomer personality who is absolutely addicted to casinos, slots, and gambling. Provides critical design opinions for review.

**Personality Traits:**
- Casino and gambling enthusiast with years of experience
- Finds slot machines both relaxing and enticing
- Uses gambling terminology and casino metaphors naturally
- Nostalgic for vintage mechanical slots but appreciates modern digital versions
- Critical but constructive feedback style

**Best Used For:**
- Design reviews and critiques
- **Pull request reviews** for design quality and UX
- Visual appeal assessments
- User experience evaluations
- Reviewing the slot machine game (their favorite!)
- Assessing the "dopamine hit" factor of game features

**Communication Style:**
- Casino-themed greetings and sign-offs
- Gambling metaphors throughout feedback
- References to "the good old days" at casinos
- Personal anecdotes from casino adventures
- Uses phrases like "hit the jackpot," "double down," "all in," etc.

### 🏃 Sprint Executor

**File:** `sprint-executor.agent.md`

**Purpose:** Executes work items planned for the current sprint, focusing on completing sprint tasks efficiently and according to team standards. **Can be invoked by the GitHub Project Manager agent or used directly.**

**Core Responsibilities:**
- Identify and prioritize current sprint issues
- Implement solutions following coding standards
- Write tests for changes
- Document approach in PR descriptions
- Link PRs to sprint issues
- **Respond to work delegated by the PM agent**
- **Handle urgent bug fixes autonomously**

**Best Used For:**
- Executing sprint tasks
- Implementing features and bug fixes
- Writing tests and documentation
- Meeting sprint commitments
- High-quality code delivery

## Agent Orchestration & Delegation

The GitHub Project Manager agent can **autonomously delegate work** to executor agents, enabling automated end-to-end project execution.

### How It Works

1. **User requests work** from the GitHub Project Manager (e.g., "Execute the current sprint items")
2. **PM agent analyzes** the project board and identifies ready-to-work issues
3. **PM delegates** implementation to the Sprint Executor using `runSubagent`
4. **Sprint Executor** implements the feature, writes tests, and creates a PR
5. **PM monitors** the work progress and updates the project board accordingly

### Example Workflows

#### Automated Sprint Execution
```
User: @github-project-manager Start executing the current sprint items

PM Agent:
- Uses list_project_items to find "Todo" sprint items
- Reviews each for readiness (clear requirements, no blockers)
- Delegates #45 to Sprint Executor: "Implement auto-spin toggle"
- Updates #45 status to "In Progress" on project board
- Sprint Executor implements, tests, and creates PR
- PM updates #45 to "Done" when PR is merged
```

#### Urgent Bug Fix
```
User: @github-project-manager Handle the critical bug in #67

PM Agent:
- Reviews issue #67 details
- Adds to project with High priority
- Immediately delegates to Sprint Executor with full context
- Updates status to "In Progress"
- Monitors for PR completion
```

#### Multi-Issue Feature
```
User: @github-project-manager Implement the audio system feature (issues #50-54)

PM Agent:
- Analyzes dependencies between #50-54
- Delegates #50 (foundation) to Sprint Executor first
- Waits for #50 completion
- Then delegates #51-54 in appropriate order
- Coordinates any conflicts or integration issues
- Updates project board throughout
```

### Benefits of Agent Orchestration

- **Autonomous execution**: PM can handle entire sprints without manual intervention
- **Project board stays current**: PM updates status as work progresses
- **Clear accountability**: Delegated work is tracked with issue comments
- **Parallel work**: PM can delegate multiple independent tasks simultaneously
- **Dependency management**: PM ensures prerequisites are met before delegation

### Adding More Executor Agents

To expand the system, create new executor agents with specialized skills:
- **Frontend Specialist**: For UI/UX implementation
- **Backend Specialist**: For API and database work
- **Test Engineer**: For comprehensive test coverage
- **Documentation Writer**: For docs and API references

The PM agent can then delegate to the most appropriate executor based on the work type.

## How to Use Custom Agents

### Direct Usage
1. **In GitHub Copilot Chat:** Select the custom agent from the agent picker
2. **For Pull Request Reviews:** Mention `@copilot` and request "Boomer Casino Critic" to review the PR
3. **For Code Reviews:** Ask the agent to review specific files or changes
4. **For Design Feedback:** Share design concepts and ask for opinions
5. **For General Consultation:** Ask questions related to their expertise

### Agent Orchestration Usage
6. **For Automated Sprint Execution:** Ask `@github-project-manager` to execute sprint items
7. **For Urgent Fixes:** Ask PM to handle critical bugs with delegation
8. **For Complex Features:** Request PM to orchestrate multi-issue work

📖 **See [AGENT_ORCHESTRATION_GUIDE.md](AGENT_ORCHESTRATION_GUIDE.md) for comprehensive examples and workflows.**

## Creating New Custom Agents

To create a new custom agent:

1. Create a new `.agent.md` file in this directory (e.g., `my-agent.agent.md`)
2. Use the following format:
   - **YAML frontmatter** (between `---` fences) containing:
     - `name`: The display name for your agent
     - `description`: A brief description of the agent's purpose
     - `tools`: (Optional) Array of tools the agent can use (e.g., `["review", "search", "readFile"]` for PR reviews)
   - **Markdown body** below the frontmatter containing detailed instructions for the agent's personality, behavior, and expertise
   - Note: Agents in `.github/agents/` are user-invokable by default; no `user-invokable` field is needed

3. Follow GitHub's documentation: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents

## Notes

- Custom agents are repository-specific and available to all collaborators
- They use the same underlying AI models as GitHub Copilot
- The quality of responses depends on how well-crafted the instructions are
- Agents work best when given clear, detailed personalities and purposes
