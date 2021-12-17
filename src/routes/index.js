function route(app){ 
    app.get('/', (req, res) => {
        return res.render('home');
    });
}

module.exports = route;

