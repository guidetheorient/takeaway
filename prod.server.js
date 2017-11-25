var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});
app.use(router);

const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;

const apiRoutes = express.Router();

apiRoutes.get('/seller',function(req,res){
  res.json({
    errno: 0,
    data: seller
  })
})
apiRoutes.get('/goods',function(req,res){
  res.json({
    errno: 0,
    data: goods
  })
})
apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno: 0,
    data: ratings
  })
})
app.use('/api',apiRoutes);

app.use(express.static('./dist'))
// app.get('/', function(req,res){
//   console.log(req);
//   res.send('hello world')
// })

app.listen(3000, function(){
  console.log('3000')
})