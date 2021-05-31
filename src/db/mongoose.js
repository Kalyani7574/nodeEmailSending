const mongoose=require('mongoose')
 

mongoose.connect('mongodb://127.0.0.1:27017/products-api', {
    
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
