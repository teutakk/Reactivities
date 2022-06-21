import { makeObservable, observable } from "mobx";

export default class ActivityStore {
    title = 'Hello From MobX';

    constructor(){
        makeObservable(this, {
            title: observable
        })
    }
}