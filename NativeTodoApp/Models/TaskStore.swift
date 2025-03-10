import Foundation
import SwiftUI

class TaskStore: ObservableObject {
    @Published var tasks: [Task] = [] {
        didSet {
            saveTasks()
        }
    }
    
    private let tasksKey = "tasks"
    
    init() {
        loadTasks()
    }
    
    func addTask(name: String) {
        let newTask = Task(name: name)
        tasks.append(newTask)
    }
    
    func deleteTask(at offsets: IndexSet) {
        tasks.remove(atOffsets: offsets)
    }
    
    func toggleTaskCompletion(task: Task) {
        if let index = tasks.firstIndex(where: { $0.id == task.id }) {
            tasks[index].isCompleted.toggle()
        }
    }
    
    private func saveTasks() {
        let encoder = JSONEncoder()
        if let data = try? encoder.encode(tasks) {
            UserDefaults.standard.set(data, forKey: tasksKey)
        }
    }
    
    private func loadTasks() {
        if let data = UserDefaults.standard.data(forKey: tasksKey) {
            let decoder = JSONDecoder()
            if let savedTasks = try? decoder.decode([Task].self, from: data) {
                tasks = savedTasks
            }
        }
    }
} 