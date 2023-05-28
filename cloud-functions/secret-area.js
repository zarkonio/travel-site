// exports.handler = function(event, context, callback){
//   callback(null, {
//     statusCode: 200,
//     body: "Welcome to the super secret area"
//   })
// }

// adresa moje cloud fje:
// https://tourmaline-pika-8c0139.netlify.app/.netlify/functions/secret-area

// exports.handler = async function (event, context) {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: "Hello World" }),
//   };
// };

exports.handler = function(event, context, callback){
  const secretContent = `
    <h3>Welcome To The Secret Area</h3>
    <p>Here we can tell you that sky is <strong>blue</strong> and two plus two equals four.</p>
  `

  let body

  if(event.body){
    body = JSON.parse(event.body)
  } else {
    body = {}
  }

  if(body.password == "javascript") {
    callback(null, {
      statusCode: 200,
      body: secretContent
    })
  } else {
    callback(null, {
      statusCode: 401  // unautorized
    })
  }
}

// u praksi je dobro da github repo na koji pushujemo bude private a ne public ako radimo na bekendu tj. na cloud functionima
// za front end manje vise