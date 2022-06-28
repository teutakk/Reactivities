import { Activity } from './../models/activity';
import { makeAutoObservable } from "mobx";
import agent from '../api/agent';

export default class ActivityStore {
    //activvities is a type of Activity array and we initialize it as an empty array
    activities: Activity[] = [];
    //Selected activity can be an activity or null
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;
    constructor(){
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.loadingInitial = true;

        try {
            const activities = await agent.Activities.list();
            
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity);
                }) 
                this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
            
        }
    }
    
    
}