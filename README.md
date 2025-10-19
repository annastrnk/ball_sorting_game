# Ball Sorting Game 🎮

A physics-based puzzle game where you control a white ball to group colored balls together. Built with React, TypeScript, and Matter.js.

## Features

**Configurable Colors**: Choose 2-6 colors (Pink, Blue, Yellow, Green, Orange, Purple)  
**Dynamic Ball Counts**: Adjust the number of balls for each color (0-15)  
**Repulsion Force Field**: Player ball pushes colored balls away when approaching
**Pause Function**: Pause and resume the game anytime  
**Precision Timer**: Track your completion time with 10ms accuracy  
**Record Tracking**: Best time is saved locally and displayed  
**Win Detection**: Automatically detects when balls are grouped correctly  
**Touch Support**: Works on desktop and mobile devices  
**Restart Anytime**: Reset the game or return to configuration  
**Smooth Physics**: Powered by Matter.js for realistic ball movement  

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How to Play

1. **Choose Colors**: Select how many colors to play with (2-6)
2. **Configure Balls**: Set the number of balls for each color (0-15 per color)
3. **Start**: Click "Start Game" to begin - timer starts automatically!
4. **Control**: Move your mouse to control the white ball
5. **Repel**: Colored balls are pushed away when you approach them
6. **Pause**: Click "Pause" button anytime to pause/resume
7. **Group**: Use the repulsion to herd balls of the same color together
8. **Win**: Group all colors successfully to stop the timer
9. **Record**: Beat your best time in subsequent plays

- **React 18.3**: UI framework
- **TypeScript 5.6**: Type safety
- **Matter.js 0.20**: 2D physics engine
- **Vite 6.0**: Build tool and dev server

