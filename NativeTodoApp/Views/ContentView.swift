import SwiftUI

struct ContentView: View {
    @StateObject private var taskStore = TaskStore()
    @State private var newTaskName = ""
    
    var body: some View {
        NavigationView {
            VStack {
                List {
                    ForEach(taskStore.tasks) { task in
                        TaskRow(task: task, toggleCompletion: {
                            taskStore.toggleTaskCompletion(task: task)
                        })
                    }
                    .onDelete(perform: taskStore.deleteTask)
                }
                
                HStack {
                    TextField("Add a new task", text: $newTaskName)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                    
                    Button(action: {
                        if !newTaskName.isEmpty {
                            taskStore.addTask(name: newTaskName)
                            newTaskName = ""
                        }
                    }) {
                        Image(systemName: "plus.circle.fill")
                            .font(.title)
                    }
                    .disabled(newTaskName.isEmpty)
                }
                .padding()
            }
            .navigationTitle("Todo List")
            .toolbar {
                EditButton()
            }
        }
    }
}

struct TaskRow: View {
    let task: Task
    let toggleCompletion: () -> Void
    
    var body: some View {
        HStack {
            Button(action: toggleCompletion) {
                Image(systemName: task.isCompleted ? "checkmark.circle.fill" : "circle")
                    .foregroundColor(task.isCompleted ? .green : .primary)
            }
            
            Text(task.name)
                .strikethrough(task.isCompleted)
                .foregroundColor(task.isCompleted ? .gray : .primary)
            
            Spacer()
        }
        .contentShape(Rectangle())
        .onTapGesture {
            toggleCompletion()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
} 