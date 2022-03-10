const { Observable } = require('rxjs');
const { pluck, map, filter } = require('rxjs/operators');

const users = {
  data: [
    { id: 1, status: 'active', age: 14, },
    { id: 2, status: 'inactive', age: 12, },
    { id: 3, status: 'active', age: 42, },
    { id: 4, status: 'inactive', age: 42, },
    { id: 5, status: 'active', age: 13, },
    { id: 6, status: 'inactive', age: 75, },
    { id: 7, status: 'inactive', age: 43, },
    { id: 8, status: 'inactive', age: 54, },
    { id: 9, status: 'active', age: 7, },
    { id: 10, status: 'active', age: 17, },
  ],
};


const observer = {
  next: (value) => console.log('Observer got value of: ', value),
  error: (error) => console.log('Observer got error: ', error),
  complete: (complete) => console.log('Observer got complete'),
}

const observable = new Observable((subscriber) => { 
  subscriber.next(users); // stops as soon as we hit an error in the observer by default
}).pipe(
  pluck(('data')), // extract the data array from the users object
   
  map((allUsers) => {
    return allUsers.filter(user => user.status === 'active') // extract active users
  }),

  map((activeUsers) => {
    return activeUsers.reduce((sum, user) => sum + user.age, 0) / activeUsers.length // get the average age of the active users
  }),

  map((averageAge) => {
    if (averageAge < 18) throw new Error('Average age is too young'); // gets caught by error callback in observer
    else return averageAge;
  }),

)

observable.subscribe(observer);