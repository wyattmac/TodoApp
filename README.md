# Ionic Todo App

A cross-platform to-do list application built with Ionic, React, and Capacitor. This app can be deployed to iOS using Ionic AppFlow.

## Features

- Add, delete, and complete tasks
- View completed tasks
- Persistent storage using Capacitor Preferences
- Settings page with theme options
- Cross-platform (iOS, Android, Web)

## Prerequisites

- Node.js and npm
- Ionic CLI: `npm install -g @ionic/cli`
- For iOS builds: Ionic AppFlow account

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/TodoApp.git
   cd TodoApp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the app in the browser:
   ```
   ionic serve
   ```

## Building for iOS (Using AppFlow)

Since this app is developed on Windows, you'll need to use Ionic AppFlow to build for iOS:

1. Create an Ionic AppFlow account at [dashboard.ionicframework.com](https://dashboard.ionicframework.com/)

2. Connect your app to AppFlow:
   ```
   ionic link
   ```

3. Push your code to a Git repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

4. In the AppFlow dashboard:
   - Create a new app
   - Connect it to your Git repository
   - Set up iOS build
   - Use either manual signing or Appflow signing

5. Download the resulting .ipa file or use Live Deploy for testing

## Building for Android (Locally on Windows)

1. Build the web assets:
   ```
   ionic build
   ```

2. Sync with Capacitor:
   ```
   ionic cap sync
   ```

3. Open in Android Studio:
   ```
   ionic cap open android
   ```

4. Build and run from Android Studio

## Project Structure

- `src/pages/`: Contains the main tab pages
  - `Tab1.tsx`: Active tasks list
  - `Tab2.tsx`: Completed tasks list
  - `Tab3.tsx`: Settings
- `src/services/`: Contains services
  - `StorageService.ts`: Handles persistent storage

## License

MIT 