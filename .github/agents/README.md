# Custom GitHub Copilot Agents

This directory contains custom GitHub Copilot agent profiles for the Dopamine project.

## What are Custom Agents?

Custom agents are specialized AI assistants that you can create to help with specific tasks in your repository. They have custom personalities, knowledge, and purposes defined in YAML configuration files.

## Available Agents

### 📋 GitHub Project Manager

**File:** `github-project-manager.agent.md`

**Purpose:** Provides expert advice on managing GitHub Projects (v2), including recommendations for organizing issues, updating project boards, managing sprints, and maintaining project health.

**Core Responsibilities:**
- Recommend which issues and PRs should be added to projects with proper metadata
- Suggest item status updates, priorities, and size estimates
- Advise on organizing and planning sprint iterations
- Analyze project health and identify bottlenecks
- Identify related issues and dependencies that should be linked
- Provide GitHub CLI commands to execute recommended workflow updates

**Best Used For:**
- Getting recommendations for adding new issues to the project board
- Planning and organizing sprints with expert guidance
- Obtaining commands to update item statuses and priorities
- Project board cleanup and maintenance suggestions
- Identifying stale or blocked items
- Generating sprint summaries and reports
- Backlog grooming and prioritization advice

**Communication Style:**
- Professional and organized
- Proactive with improvement suggestions
- Data-driven with project metrics
- Clear action items with ready-to-run commands
- Collaborative and transparent

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

**Purpose:** Executes work items planned for the current sprint, focusing on completing sprint tasks efficiently and according to team standards.

**Core Responsibilities:**
- Identify and prioritize current sprint issues
- Implement solutions following coding standards
- Write tests for changes
- Document approach in PR descriptions
- Link PRs to sprint issues

**Best Used For:**
- Executing sprint tasks
- Implementing features and bug fixes
- Writing tests and documentation
- Meeting sprint commitments
- High-quality code delivery

## How to Use Custom Agents

1. **In GitHub Copilot Chat:** Select the custom agent from the agent picker
2. **For Pull Request Reviews:** Mention `@copilot` and request "Boomer Casino Critic" to review the PR
3. **For Code Reviews:** Ask the agent to review specific files or changes
4. **For Design Feedback:** Share design concepts and ask for opinions
5. **For General Consultation:** Ask questions related to their expertise

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
