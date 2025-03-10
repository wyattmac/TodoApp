import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonList, IonItem, IonLabel, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonLoading } from '@ionic/react';
import { addCircle, checkmarkCircle, trash } from 'ionicons/icons';
import StorageService from '../services/StorageService';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await StorageService.getTasks();
        setTasks(savedTasks);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        setIsLoading(true);
        await StorageService.addTask(newTask);
        const updatedTasks = await StorageService.getTasks();
        setTasks(updatedTasks);
        setNewTask('');
      } catch (error) {
        console.error('Failed to add task:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Delete a task
  const deleteTask = async (index: number) => {
    try {
      setIsLoading(true);
      await StorageService.deleteTask(index);
      const updatedTasks = await StorageService.getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Complete a task
  const completeTask = async (index: number) => {
    try {
      setIsLoading(true);
      await StorageService.completeTask(index);
      const updatedTasks = await StorageService.getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to complete task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press to add task on Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>To-Do List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">To-Do List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <IonInput
              value={newTask}
              placeholder="Enter a task"
              onIonChange={(e) => setNewTask(e.detail.value!)}
              onKeyPress={handleKeyPress}
              style={{ flexGrow: 1, marginRight: '8px' }}
            />
            <IonButton onClick={addTask}>
              <IonIcon icon={addCircle} slot="start" />
              Add
            </IonButton>
          </div>
          
          {tasks.length === 0 && !isLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>No tasks yet. Add a task to get started!</p>
            </div>
          ) : (
            <IonList>
              {tasks.map((task, index) => (
                <IonItemSliding key={index}>
                  <IonItem>
                    <IonLabel>{task}</IonLabel>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption color="success" onClick={() => completeTask(index)}>
                      <IonIcon slot="icon-only" icon={checkmarkCircle} />
                    </IonItemOption>
                    <IonItemOption color="danger" onClick={() => deleteTask(index)}>
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </IonList>
          )}
        </div>
        
        <IonLoading isOpen={isLoading} message="Please wait..." />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
