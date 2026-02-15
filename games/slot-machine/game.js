/**
 * Slot Machine Game
 * 
 * Auto-playing slot machine with 3 reels and weighted random symbols.
 */

import { config } from './config.js';

class SlotMachine {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.config = { ...config, ...options };
    this.state = {
      running: false,
      spinning: false,
      credits: this.config.initialCredits,
      lastWin: 0,
      reels: [0, 0, 0],
    };
    
    this.elements = {
      credits: document.getElementById('credits'),
      lastWin: document.getElementById('last-win'),
      status: document.getElementById('status'),
      startBtn: document.getElementById('start-btn'),
      stopBtn: document.getElementById('stop-btn'),
      resetBtn: document.getElementById('reset-btn'),
      reels: []
    };
    
    this.autoPlayTimer = null;
    this.init();
  }
  
  init() {
    // Initialize reel elements
    for (let i = 0; i < this.config.reelCount; i++) {
      this.elements.reels[i] = document.getElementById(`reel-${i}`);
      this.populateReel(i);
    }
    
    // Bind event handlers
    this.handleStart = () => this.start();
    this.handleStop = () => this.stop();
    this.handleReset = () => this.reset();
    
    // Set up event listeners
    this.elements.startBtn.addEventListener('click', this.handleStart);
    this.elements.stopBtn.addEventListener('click', this.handleStop);
    this.elements.resetBtn.addEventListener('click', this.handleReset);
    
    this.render();
  }
  
  populateReel(reelIndex) {
    const reel = this.elements.reels[reelIndex];
    reel.innerHTML = '';
    
    // Create multiple symbol sets for smooth scrolling
    for (let i = 0; i < this.config.symbolsPerReel * 3; i++) {
      const symbolDiv = document.createElement('div');
      symbolDiv.className = 'symbol';
      symbolDiv.textContent = this.getRandomSymbol().name;
      reel.appendChild(symbolDiv);
    }
  }
  
  getRandomSymbol() {
    const totalWeight = this.config.symbols.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const symbol of this.config.symbols) {
      random -= symbol.weight;
      if (random <= 0) {
        return symbol;
      }
    }
    
    return this.config.symbols[0];
  }
  
  start() {
    if (this.state.running) return;
    
    this.state.running = true;
    this.elements.startBtn.disabled = true;
    this.elements.stopBtn.disabled = false;
    this.updateStatus('Auto-playing...');
    
    this.autoPlay();
  }
  
  stop() {
    this.state.running = false;
    this.elements.startBtn.disabled = false;
    this.elements.stopBtn.disabled = true;
    this.updateStatus('Stopped');
    
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
  
  reset() {
    this.stop();
    this.state.credits = this.config.initialCredits;
    this.state.lastWin = 0;
    this.state.reels = [0, 0, 0];
    this.render();
    this.updateStatus('Reset - Press Start to begin');
  }
  
  autoPlay() {
    if (!this.state.running) return;
    
    this.spin();
    
    this.autoPlayTimer = setTimeout(() => {
      this.autoPlay();
    }, this.config.spinDuration + this.config.spinInterval);
  }
  
  async spin() {
    if (this.state.spinning) return;
    
    // Check if player has credits
    if (this.state.credits < this.config.spinCost) {
      this.updateStatus('Out of credits! Reset to continue.');
      this.stop();
      return;
    }
    
    this.state.spinning = true;
    this.state.credits -= this.config.spinCost;
    this.updateStatus('Spinning...');
    this.render();
    
    // Select winning symbols
    const results = [];
    for (let i = 0; i < this.config.reelCount; i++) {
      results.push(this.getRandomSymbol());
    }
    
    // Animate reels
    this.animateReels(results);
    
    // Wait for spin to complete
    await this.delay(this.config.spinDuration);
    
    // Check for wins
    this.checkWin(results);
    
    this.state.spinning = false;
  }
  
  animateReels(results) {
    this.elements.reels.forEach((reel, index) => {
      reel.classList.add('spinning');
      
      // Stop reel after delay
      setTimeout(() => {
        reel.classList.remove('spinning');
        // Update reel to show result
        const symbols = reel.querySelectorAll('.symbol');
        const targetIndex = Math.floor(symbols.length / 2);
        if (symbols[targetIndex]) {
          symbols[targetIndex].textContent = results[index].name;
        }
      }, this.config.spinDuration + (index * this.config.reelStaggerDelay));
    });
  }
  
  checkWin(results) {
    // Check if all symbols match
    const firstSymbol = results[0];
    const allMatch = results.every(r => r.name === firstSymbol.name);
    
    if (allMatch) {
      const winAmount = firstSymbol.payout * this.config.spinCost;
      this.state.credits += winAmount;
      this.state.lastWin = winAmount;
      this.updateStatus(`🎉 WIN! ${firstSymbol.displayName} - ${winAmount} credits!`);
    } else {
      this.state.lastWin = 0;
      this.updateStatus('No match - Try again!');
    }
    
    this.render();
  }
  
  updateStatus(message) {
    this.elements.status.textContent = message;
  }
  
  render() {
    this.elements.credits.textContent = this.state.credits;
    this.elements.lastWin.textContent = this.state.lastWin;
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  destroy() {
    this.stop();
    // Clean up event listeners
    this.elements.startBtn.removeEventListener('click', this.handleStart);
    this.elements.stopBtn.removeEventListener('click', this.handleStop);
    this.elements.resetBtn.removeEventListener('click', this.handleReset);
  }
}

// Auto-initialize if on the slot machine page
if (document.getElementById('game-container')) {
  const game = new SlotMachine('game-container');
  window.slotMachine = game; // Make available globally for debugging
}

export { SlotMachine };
