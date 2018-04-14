// const book = {
//   title: 'Ego is the Eneme',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// };

// const {name: publisherName = 'self-Published'} = book.publisher;

// console.log(publisherName);

// //Array destructuring

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19148'];

// const [street, city, state, zip] = address;

// console.log(`You are in ${city} ${state}.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [beverage, ,midPrice] = item;

console.log(`A medium ${beverage} costs ${midPrice}.`);
