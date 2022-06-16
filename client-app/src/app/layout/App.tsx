import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
   
function App() {
  const [activities, setActivitites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);

  //it takes no parameters
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      
      setActivitites(response.data);
      
    })
  }, []);

  function handleSelectActivity(id: string){
    //x is a variable which is gonna hold the activity 
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }



  return (
    <>
     <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop:'7em'}}>
        {/* is passing activities down as properties */}
        <ActivityDashboard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity = {handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        />
      </Container>
    </>
  );
}

export default App;
