var express = require("express");
var useragent = require('useragent');
var path = require('path');
var app = express();
var port = Number(process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
	res.sendFile(path.join(__dirname + '/public/index.html'));
	res.end();
});

app.get('/api/whoami',(req,res)=>{
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var lang = req.headers['accept-language'] || req.acceptsLanguages;
	var system = useragent.parse(req.headers['user-agent']).os.family;
	var headerObj = {"ipaddress": ip, "language": lang.split(",")[0], "software": system};
	res.end(JSON.stringify(headerObj));
});
app.listen(port,()=>{
	console.log('listening on  port: ' + port.toString());
});