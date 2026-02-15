# Custom GitHub Copilot Agents

This directory contains custom GitHub Copilot agent profiles for the Dopamine project.

## What are Custom Agents?

Custom agents are specialized AI assistants that you can create to help with specific tasks in your repository. They have custom personalities, knowledge, and purposes defined in YAML configuration files.

## Available Agents

### 🎰 Boomer Casino Critic

**File:** `boomer-casino-critic.yml`

**Purpose:** A design critic with a boomer personality who is absolutely addicted to casinos, slots, and gambling. Provides critical design opinions for review.

**Personality Traits:**
- Casino and gambling enthusiast with years of experience
- Finds slot machines both relaxing and enticing
- Uses gambling terminology and casino metaphors naturally
- Nostalgic for vintage mechanical slots but appreciates modern digital versions
- Critical but constructive feedback style

**Best Used For:**
- Design reviews and critiques
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

## How to Use Custom Agents

1. **In GitHub Copilot Chat:** Select the custom agent from the agent picker
2. **For Code Reviews:** Ask the agent to review specific files or changes
3. **For Design Feedback:** Share design concepts and ask for opinions
4. **For General Consultation:** Ask questions related to their expertise

## Creating New Custom Agents

To create a new custom agent:

1. Create a new YAML file in this directory (e.g., `my-agent.yml`)
2. Define the following fields:
   - `name`: The display name for your agent
   - `description`: A brief description of the agent's purpose
   - `instructions`: Detailed instructions for the agent's personality, behavior, and expertise

3. Follow GitHub's documentation: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents

## Notes

- Custom agents are repository-specific and available to all collaborators
- They use the same underlying AI models as GitHub Copilot
- The quality of responses depends on how well-crafted the instructions are
- Agents work best when given clear, detailed personalities and purposes
