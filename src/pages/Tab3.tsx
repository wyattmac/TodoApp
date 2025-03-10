import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, IonButton, IonIcon, IonSelect, IonSelectOption } from '@ionic/react';
import { save, colorPalette, notifications, moon } from 'ionicons/icons';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState<string>('default');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you'd apply the dark mode to the entire app
    document.body.classList.toggle('dark', !darkMode);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: '16px' }}>
          <IonList>
            <IonItem>
              <IonIcon icon={moon} slot="start" />
              <IonLabel>Dark Mode</IonLabel>
              <IonToggle 
                checked={darkMode} 
                onIonChange={toggleDarkMode} 
              />
            </IonItem>
            
            <IonItem>
              <IonIcon icon={notifications} slot="start" />
              <IonLabel>Notifications</IonLabel>
              <IonToggle 
                checked={notificationsEnabled} 
                onIonChange={() => setNotificationsEnabled(!notificationsEnabled)} 
              />
            </IonItem>
            
            <IonItem>
              <IonIcon icon={colorPalette} slot="start" />
              <IonLabel>Theme</IonLabel>
              <IonSelect 
                value={theme}
                onIonChange={(e) => setTheme(e.detail.value)}
              >
                <IonSelectOption value="default">Default</IonSelectOption>
                <IonSelectOption value="ocean">Ocean</IonSelectOption>
                <IonSelectOption value="forest">Forest</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <IonButton color="primary">
              <IonIcon slot="start" icon={save} />
              Save Settings
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
