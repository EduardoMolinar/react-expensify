import * as firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGIN_SENDER_ID
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  export {firebase, database as default};
  
  // database.ref().set({
  //   name: 'Eduardo Molinar',
  //   age: 23,
  //   stressLevel: 6,
  //   job: {
  //     title: 'Software developer',
  //     company: 'Google'
  //   },
  //   location: {
  //     city: "Panama",
  //     country: "Panama"
  //   }
  // }).then(() => {
  //   console.log('Data is saved');
  // }).catch((e) => {
  //   console.log('This failed', e);
  // });

  // // database.ref('age').set(25);
  // // database.ref('location/city').set("Colón");

  // database.ref('attributes').set({
  //   height: '1.78',
  //   weight: '175'
  // }).then(() => {console.log("this works")})
  // .catch(() => {console.log("nope")});

// const reference = database.ref('age');
// reference.remove()
//   .then(() => {
//     console.log("deleted succesfully");
//   })
//   .catch(() => {
//     console.log('failed to remove');
//   });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });

// database.ref().once('value')
//   .then((response) => {
//     console.log(response.val());
//   })
//   .catch(() => {
//     console.log('fetching failed');
//   });


// //subscribes to data bases changes
//   const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
//   }, (e) => {
//     console.log('error fetching')
//   });

//   database.ref().off(onValueChange);


// //firebase array
// database.ref('notes').push({
//   title: 'Course Topics',
//   body: 'React Ntavie, Angular, Python'
// });

// database.ref('expenses')
//   .push({
//   description: 'Gum',
//   note: '',
//   amount: 195,
//   createdAt: 0
//   });

//   database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     createdAt: 5
//   });
  
//   database.ref('expenses').push({
//     description: 'Credit Card',
//     note: '',
//     amount: 4500,
//     createdAt: 8
//   });

// //fetch array data
// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
    
//   });

//   //fetch array data - subscribe
//   database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//   });

// //gets triggered when child is removed, returns removed child
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });