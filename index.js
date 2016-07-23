var nodemailer = require('nodemailer');
var app = require('express')();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/pesagem/:peso/:email', function (req, res) {
    var t = req.params.peso;
    var email = req.params.email;
    if (t != null && email != null) {
        var transporter = nodemailer.createTransport({
            host: 'smtp.live.com',
            port: 587,
            auth: {
                user: 'meuemail@hotmail.com',
                pass: ''
            }
        });

        transporter.sendMail({
            from: 'meuemail@hotmail.com',
            to: email,
            subject: 'Pesagem de teste',
            html: '<h1><b>Olá tudo bem, o peso informado é: ' + t + '</b></h1>'
        }, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).send(error);
            }
            console.log('Message sent: ' + info.response);

            return res.status(200).send('Email enviado com sucesso!');
        });
    }
});

var server = app.listen('8080', function () {
    console.log('servidor rodando na porta ' + server.address().port);
});