# Audio Design & Concepts

This directory contains audio design documentation, sound effect concepts, and music direction for Dopamine games.

## Contents

### Sound Design Guidelines
- Sound effect specifications
- Music direction and mood
- Audio mixing standards
- File format requirements

### Sound Effects
Audio concepts for:
- Game events (spin, win, lose)
- UI interactions (clicks, hover)
- Transitions and animations
- Ambient background sounds

### Music
Musical concepts for:
- Menu/landing page theme
- Game-specific background music
- Victory fanfares
- Ambient loops

## Audio Philosophy

### Key Principles
1. **Non-intrusive**: Sounds should enhance, not annoy
2. **Satisfying**: Clear feedback for actions and wins
3. **Optional**: Games work perfectly with sound off
4. **High quality**: Professional, clean recordings
5. **Optimized**: Small file sizes for web delivery

### Sound Design Goals
- **Playful**: Match the fun, casual nature of games
- **Rewarding**: Wins should sound exciting
- **Responsive**: Immediate feedback for user actions
- **Cohesive**: Consistent audio aesthetic across games

## Technical Specifications

### File Formats
- **Primary**: MP3 (wide compatibility)
- **Alternative**: OGG (better compression)
- **Avoid**: WAV (too large for web)

### Quality Guidelines
- **Sample Rate**: 44.1kHz
- **Bit Rate**: 128-192 kbps for effects, 256 kbps for music
- **File Size**: < 100KB per sound effect, < 500KB per music loop
- **Length**: 0.1-2s for effects, 30-120s for music loops
- **Format**: Mono for effects, stereo for music

### Normalization
- **Peak**: -1dBFS (prevent clipping)
- **Loudness**: -14 LUFS for music, -12 LUFS for effects
- **Dynamic Range**: Maintain some dynamics, avoid over-compression

## Sound Categories

### UI Sounds
- **Click**: Button and control interactions
- **Hover**: Mouse-over feedback (subtle)
- **Toggle**: Switch and checkbox sounds
- **Error**: Invalid action or warning
- **Success**: Confirmation and completion

### Game Events
- **Start**: Game begins
- **Spin/Action**: Primary game action
- **Stop**: Action completes
- **Win**: Victory (small, medium, large variations)
- **Lose**: Loss or no-win (gentle, not discouraging)
- **Bonus**: Special events or jackpots

### Ambient
- **Background**: Subtle loops for atmosphere
- **Theme**: Menu music (optional)

## Audio Implementation

### Integration Pattern
```javascript
// Example from future audio manager
const audio = new AudioManager({
  volume: 0.7,
  muted: false
});

await audio.loadSound('spin', '/assets/sounds/spin.mp3');
await audio.loadSound('win', '/assets/sounds/win.mp3');

// Play on event
audio.playSound('spin');
audio.playSound('win', { volume: 1.0 });
```

### Fallbacks
- Always provide visual feedback alongside audio
- Test with sound disabled
- Respect user preferences for reduced motion/sound

## Sound References

### Inspiration
- **Arcade classics**: Pac-Man, Space Invaders (retro bleeps)
- **Modern mobile**: Candy Crush, Angry Birds (satisfying pops)
- **Slot machines**: Real casino sounds (mechanical, digital)
- **UI sounds**: iOS, Material Design (clean, minimal)

### Mood and Tone
- **Upbeat**: Positive and energetic
- **Playful**: Fun, not serious
- **Rewarding**: Celebratory on wins
- **Gentle**: Non-jarring, pleasant

## File Organization

```
audio/
├── README.md           # This file
├── specifications.md   # Detailed audio specs
├── sound-effects/      # SFX concepts and docs
│   ├── ui/
│   ├── game-events/
│   └── ambient/
├── music/              # Music concepts
│   ├── themes/
│   └── loops/
└── references/         # Inspiration and examples
```

## Production Workflow

1. **Concept**: Document desired sounds and mood
2. **Reference**: Collect inspiration and examples
3. **Prototype**: Create rough versions or find temp assets
4. **Test**: Integrate and playtest with the game
5. **Refine**: Adjust based on feedback
6. **Produce**: Create final, optimized assets
7. **Implement**: Move to `/assets/sounds/` and integrate

## Tools and Resources

### Creation Tools
- **Audacity**: Free audio editing (cross-platform)
- **GarageBand**: Music creation (Mac)
- **FL Studio**: Professional DAW
- **Bfxr**: Retro game sound generator
- **ChipTone**: 8-bit sound effects

### Sound Libraries
- **Freesound.org**: Creative Commons sounds
- **Zapsplat**: Free sound effects
- **Incompetech**: Royalty-free music
- **BBC Sound Effects**: Public domain library

### Processing
- **Compression**: Audacity, ffmpeg
- **Normalization**: Loudness normalization tools
- **Editing**: Trim, fade, EQ, effects

## Current Status

🚧 **Placeholder for future work**

Future audio design documentation will include:
- [ ] Sound effect mood boards and references
- [ ] Specific sound requirements per game
- [ ] Music direction and tempo guidelines
- [ ] Audio asset naming conventions
- [ ] Mixing and mastering standards
- [ ] Accessibility considerations (visual alternatives)

## Contributing

To add audio designs:
1. Create a subdirectory for your game/feature
2. Add audio samples or specifications
3. Include a README explaining the audio concept
4. Document desired mood, length, and style
5. Provide reference examples if available
6. Note any accessibility considerations
