import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
   
function App() {
  const [activities, setActivitites]= useState([]);
  //it takes no parameters
  useEffect(()=> {
    axios.get('http://localhost:5000/api/activities').then(response => {
      
      console.log(response);
      setActivitites(response.data);
    })
  }, []);

  return (
    <div className="">
      <Header as='h2' icon='users' content='Reactivities'/>
   
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
