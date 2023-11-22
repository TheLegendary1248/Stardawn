const app = require('express')()
const cors = require('cors')

app.use(cors({origin:["http://localhost:1248", "https://stardawn.web.app", "https://stardawn.space"]}))

app.all("*", (req, res, next) => {
    //console.log(req.url)
    next()
})

app.get('/', (req,res) => {
    res.send("Hello world!")
})
const PORT = process.env.PORT || 8421
app.listen(PORT, () => console.log(`Server is listening at ${PORT}`))