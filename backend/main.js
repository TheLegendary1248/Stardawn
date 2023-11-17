const app = require('express')()

app.get('/', (req,res) => {
    res.send("Hello world!")
})
const PORT = process.env.PORT || 8421
app.listen(PORT, () => console.log(`Server is listening at ${PORT}`))