# How to Properly Start the Portfolio Server

If you're seeing Mozilla license errors or CORS issues when viewing the portfolio locally, it's likely due to how the development server is being started. Follow these instructions to properly start the Vite development server.

## Prerequisites

Make sure you have Node.js and npm installed on your computer. If not, download and install them from [nodejs.org](https://nodejs.org/).

## Step-by-Step Instructions

1. **Open a terminal or command prompt**

2. **Navigate to the project directory**

   ```bash
   cd path/to/tech-portfolio
   ```

   Replace `path/to/tech-portfolio` with the actual path where you cloned or downloaded the repository.

3. **Install dependencies** (if you haven't already)

   ```bash
   npm install
   ```

   This will install all the required packages defined in package.json.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   This will start the Vite server with the default configuration.

5. **Access with the correct port and host**
   - By default, Vite will run on `http://localhost:5173/`
   - Open this URL in your browser

## Common Issues and Solutions

### Mozilla License or CORS Issues

If you see errors related to Mozilla license or CORS:

1. **Try running with host flag**

   ```bash
   npm run dev -- --host
   ```

   This will expose the server on your network and may resolve some permission issues.

2. **Try a specific port**

   ```bash
   npm run dev -- --port 3000
   ```

   This runs the server on port 3000 instead of the default port.

3. **Combined host and port**
   ```bash
   npm run dev -- --host --port 3000
   ```
   Use this if you need both options.

### Browser Cache Issues

If you're still seeing old content after making changes:

1. **Hard refresh your browser**

   - Windows/Linux: `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Clear browser cache**
   - Open developer tools (F12)
   - Right-click on the refresh button
   - Select "Empty Cache and Hard Reload"

### Other Common Issues

1. **Port already in use**
   If you see an error that the port is already in use, try:

   ```bash
   npm run dev -- --port 3011
   ```

   (Try different port numbers until you find one that works)

2. **Node version issues**
   The project should work with Node.js 14+. If you're having issues, check your Node version:

   ```bash
   node --version
   ```

3. **Vite command not found**
   If you see "vite command not found", it means dependencies aren't installed correctly. Try:
   ```bash
   npm install
   ```
   followed by
   ```bash
   npx vite
   ```

## About the AI Assistant and Snake Game

The portfolio includes:

1. **AI Assistant Chat Feature**

   - Click the floating chat button in the bottom left to interact
   - Ask questions about skills, projects, and experience

2. **Snake Game Easter Egg**
   - Press the ESC key to launch the Snake game
   - Use arrow keys to control the snake
   - Collect red food to grow
   - Game will refresh automatically after Game Over

## Performance Tips

For the best experience:

1. Use a modern browser (Chrome, Firefox, Safari, Edge)
2. Make sure JavaScript is enabled
3. Allow local storage if prompted
4. For mobile testing, use the --host flag and access via your local IP address

If you're still encountering issues after following these steps, please provide the specific error message you're seeing for more targeted assistance.
