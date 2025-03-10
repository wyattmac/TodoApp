import { Preferences } from '@capacitor/preferences';

const TASKS_KEY = 'tasks';
const COMPLETED_TASKS_KEY = 'completed_tasks';

export interface StorageService {
  // Tasks methods
  getTasks: () => Promise<string[]>;
  saveTasks: (tasks: string[]) => Promise<void>;
  
  // Completed tasks methods
  getCompletedTasks: () => Promise<string[]>;
  saveCompletedTasks: (tasks: string[]) => Promise<void>;
  
  // Task operations
  addTask: (task: string) => Promise<void>;
  deleteTask: (index: number) => Promise<void>;
  completeTask: (index: number) => Promise<void>;
}

const StorageServiceImpl: StorageService = {
  
  // Get all tasks
  getTasks: async (): Promise<string[]> => {
    const { value } = await Preferences.get({ key: TASKS_KEY });
    return value ? JSON.parse(value) : [];
  },
  
  // Save tasks
  saveTasks: async (tasks: string[]): Promise<void> => {
    await Preferences.set({
      key: TASKS_KEY,
      value: JSON.stringify(tasks),
    });
  },
  
  // Get completed tasks
  getCompletedTasks: async (): Promise<string[]> => {
    const { value } = await Preferences.get({ key: COMPLETED_TASKS_KEY });
    return value ? JSON.parse(value) : [];
  },
  
  // Save completed tasks
  saveCompletedTasks: async (tasks: string[]): Promise<void> => {
    await Preferences.set({
      key: COMPLETED_TASKS_KEY,
      value: JSON.stringify(tasks),
    });
  },
  
  // Add a new task
  addTask: async (task: string): Promise<void> => {
    const tasks = await StorageServiceImpl.getTasks();
    tasks.push(task);
    await StorageServiceImpl.saveTasks(tasks);
  },
  
  // Delete a task
  deleteTask: async (index: number): Promise<void> => {
    const tasks = await StorageServiceImpl.getTasks();
    tasks.splice(index, 1);
    await StorageServiceImpl.saveTasks(tasks);
  },
  
  // Mark a task as completed
  completeTask: async (index: number): Promise<void> => {
    const tasks = await StorageServiceImpl.getTasks();
    const completedTask = tasks[index];
    
    // Remove from active tasks
    tasks.splice(index, 1);
    await StorageServiceImpl.saveTasks(tasks);
    
    // Add to completed tasks
    const completedTasks = await StorageServiceImpl.getCompletedTasks();
    completedTasks.push(completedTask);
    await StorageServiceImpl.saveCompletedTasks(completedTasks);
  },
};

export default StorageServiceImpl; 