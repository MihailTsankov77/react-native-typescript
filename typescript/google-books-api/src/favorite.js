
// const DB_BASE_URL = 'http://localhost:3000/books';

// //fetch favorites
// export async function favoritesAdd (book){
//     console.log(book);
//     await fetch(DB_BASE_URL, {
//         method: "POST", 
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(
//             { 
//                 id: book.id,
//                 title: book.title,
//                 author: book.author,
//                 imageUrl: book.imageUrl,
//                 description: book.description
//             }
//         )
//     });
// }


// export async function favoritesDel (book){
//     await fetch(DB_BASE_URL + book.id, {
//          method: 'DELETE'
//     })
// }