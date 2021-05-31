const express = require('express')
require('./db/mongoose')
const productRouter = require('./routers/product')
 


const app = express()
const port = process.env.PORT || 8080

// app.use((req, res, next) =>{
//     res.status(500).send('site is currently down.check back soon')
// })

app.use(express.json())
app.use(productRouter)

// app.use((req,res,next) => {
//       const err = new Error('Not found')
//       err.status= 404
//       next(err)
// })

// app.use((err, req, res, next) => {
//     res.status =(err.status || 500)
//     res.send({
//         errror: {
//             status: err.status || 500,
//             message: err.message
//         }
//     })

// })
 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

 