import React, {  useEffect, useState } from 'react';
import {  Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
   
function App() {
  const {activityStore} = useStore(); 

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  //it takes no parameters
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

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
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else{
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

    function handleDeleteActivity(id: string){
      setSubmitting(true);
      //we need to pass the id we are getting from the function
      agent.Activities.delete(id).then(() => {
        setActivities([...activities.filter(x => x.id !== id )])
        setSubmitting(false);
      })
    }

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
     <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop:'7em'}}>
        {/* is passing activities down as properties */}
        <ActivityDashboard 
        activities={activityStore.activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
