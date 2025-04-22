// #create ngrx
// 1- create actions
// 2- create reducer
// 3- create selectors
// 4- create effects
// 5- create service
// add state to store/app.state.ts
// add reducer to store/app.store.ts
// add effects app.Config.ts

// #using store
// constructor(private store: Store<AppState>) {}
// ^to get value from store for example loading
// 1- initialize loading var -->   loading!: Observable<boolean>; //observable because it watch changes
// 2- get value from store --> this.loading = this.store.select(nameOfSelector);
// ^to dispatch action to store
// 1-this.store.dispatch(actionName());

// ^to get value from store use subscribe method in case of getting from api
// this.store.select(selectAllEvents).subscribe({
//   next: (events) => {
//     this.allEvents = events;
//   },
//   error: (error) => {
//     console.error('Error fetching events:', error);
//   },
// });
