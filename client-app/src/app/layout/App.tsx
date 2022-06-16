import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
   
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);

  //it takes no parameters
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      
      setActivities(response.data);
      
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
  //we are gonna pass an activity as parameter of type of Activity then we check the id
  function handleCreateOrEditActivity(activity: Activity){
    activity.id 
     ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
     : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string){
      setActivities([...activities.filter(x => x.id !== id )])
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
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
