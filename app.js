var express = require('express'),
    connect = require('connect'),
    //  routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    login = require('./routes/login'),
    about = require('./routes/about'),
    chat = require('./routes/chat'),
    settings = require('./routes/settings'),
    logout = require('./routes/logout'),
    messages = require('./lib/messages'),
    cookieParser = express.cookieParser('your secret sauce'),
    sessionStore = new connect.middleware.session.MemoryStore(),
    auth = require('./lib/auth'),
    app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cookieParser);
app.use(express.session({
    store: sessionStore
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(messages);
app.use(app.router);
//.use(routes.notfound);
//app.use(routes.error);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', login.form);
app.post('/', login.submit);
app.get('/about', about.page);
app.get('/chat', auth.mw, chat.app);
app.get('/settings', auth.mw, settings.form);
app.get('/logout', logout.redirect);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server, sessionStore, cookieParser);