const app = require('./app')
require('dotenv').config()
const PORT  = process.env.PORT || 4000;


app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:'Welcome to the SERVER User ->  Validation with Zod 👊',
    })
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
