import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonLoading } from '@ionic/react';
import { checkmarkDone, trash } from 'ionicons/icons';
import StorageService from '../services/StorageService';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load completed tasks on component mount
  useEffect(() => {
    const loadCompletedTasks = async () => {
      try {
        const savedTasks = await StorageService.getCompletedTasks();
        setCompletedTasks(savedTasks);
      } catch (error) {
        console.error('Failed to load completed tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCompletedTasks();
  }, []);

  // Delete a completed task
  const deleteCompletedTask = async (index: number) => {
    try {
      setIsLoading(true);
      const updatedTasks = [...completedTasks];
      updatedTasks.splice(index, 1);
      await StorageService.saveCompletedTasks(updatedTasks);
      setCompletedTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to delete completed task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all completed tasks
  const clearCompletedTasks = async () => {
    try {
      setIsLoading(true);
      await StorageService.saveCompletedTasks([]);
      setCompletedTasks([]);
    } catch (error) {
      console.error('Failed to clear completed tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Completed Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Completed Tasks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: '16px' }}>
          {completedTasks.length === 0 && !isLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>No completed tasks yet!</p>
            </div>
          ) : (
            <>
              <IonList>
                {completedTasks.map((task, index) => (
                  <IonItemSliding key={index}>
                    <IonItem>
                      <IonIcon icon={checkmarkDone} slot="start" color="success" />
                      <IonLabel>{task}</IonLabel>
                    </IonItem>
                    <IonItemOptions side="end">
                      <IonItemOption color="danger" onClick={() => deleteCompletedTask(index)}>
                        <IonIcon slot="icon-only" icon={trash} />
                      </IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                ))}
              </IonList>
              
              {completedTasks.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <IonButton color="medium" onClick={clearCompletedTasks}>
                    Clear All Completed Tasks
                  </IonButton>
                </div>
              )}
            </>
          )}
        </div>
        
        <IonLoading isOpen={isLoading} message="Please wait..." />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
