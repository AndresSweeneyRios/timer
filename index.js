const express = require('express'), app = express()
const fs = require('fs')

const setTimer = ( minutes ) => {
    fs.writeFileSync('./time', Date.now() + (1000 * 60 * minutes), { encoding: 'utf8' })
}

app.use(express.static(__dirname))

app.get('/set/:minutes', (req,res) => {
    setTimer(Number(req.params.minutes))
    res.redirect('/')
})

app.get('/get', (req,res) => {
    res.send(
        fs.existsSync('./time') 
            ? fs.readFileSync('./time', { encoding: 'utf8' })
            : '0'
    )
})

app.listen(process.env.PORT)

console.log(`Server listening on port ${process.env.PORT}.`)