# Native iOS ToDo App

A simple ToDo application built with SwiftUI for iOS. This app demonstrates the basic functionality of a task management application with data persistence.

## Features

- Add new tasks
- Delete tasks with swipe gestures
- Mark tasks as completed/uncompleted
- Data persistence using UserDefaults
- Modern SwiftUI interface

## Project Structure

- **Models/**
  - `Task.swift` - Defines the Task model
  - `TaskStore.swift` - Manages task data and persistence
- **Views/**
  - `ContentView.swift` - Main view of the application

## Getting Started

### Prerequisites

- Xcode 14.0 or later
- iOS 15.0 or later (for deployment target)

### Opening the Project

1. Clone or download this repository
2. Open the project in Xcode by double-clicking on the `.xcodeproj` file
3. Alternatively, open Xcode and select "Open a project or file" and navigate to the project folder

### Running on the Simulator

1. Select your desired simulator from the scheme dropdown in Xcode (e.g., iPhone 15, iPad Air, etc.)
2. Click the "Run" button (▶️) or press `⌘+R` to build and run the app
3. The app will launch in the selected simulator

## How to Use

1. **Add a Task**
   - Type your task in the text field at the bottom
   - Tap the "+" button to add it to your list

2. **Mark a Task as Completed**
   - Tap the circle next to a task to mark it as completed
   - Tap again to mark it as incomplete

3. **Delete a Task**
   - Swipe left on a task and tap "Delete"
   - Alternatively, tap "Edit" in the top right, then tap the "-" button next to a task

## Implementation Details

This app demonstrates several SwiftUI concepts:

- `@StateObject` for managing app state
- `@Published` for observing changes
- `ForEach` and `List` for displaying collections
- `UserDefaults` for basic data persistence
- Swipe actions for item deletion
- Navigation and toolbar integration

## Future Enhancements

Potential improvements that could be added:

- Task categories or tags
- Due dates and notifications
- Search functionality
- Cloud sync with iCloud
- Task priorities
- Dark mode support 