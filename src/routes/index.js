function route(app){ 
    app.get('/', (req, res) => {
        return res.render('home');
    });

    app.get('/upload_model', (req, res) => { 
        return res.render('upload_model');
    })

    app.post('/upload_model', (req, res) => {
        console.log(req.body);
        return res.render('result')
    })
}

module.exports = route;

