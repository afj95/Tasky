require('dotenv').config();

const express            = require('express');
const app                = express();
const morgan             = require("morgan");
const mongoose           = require('mongoose');
const bodyParser         = require('body-parser');
const path               = require('path');
const fs                 = require('fs');

// routes
const Auth          = require('./src/routes/Auth');
const Projects      = require('./src/routes/Projects');
const Users         = require('./src/routes/Users');

mongoose.connect(process.env.DATABASEURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
.then(() => {
    console.log('Connected to DB!');
    const testImages = path.join(__dirname, 'src/uploads/images/test');
    createDir(testImages);
  })
.catch(error => console.log(error.message));

function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }, (err) => {
        if (err) {
          console.error("createDir Error:", err);
        } else {
          console.log("Directory is made!");
        }
      });
    }
}


/**
 * If you don’t want to use Helmet, then at least disable the X-Powered-By header.
 * Attackers can use this header (which is enabled by default) to detect apps running
 * Express and then launch specifically-targeted attacks.
 * 
 * note: If you use helmet.js, it takes care of this for you.
 */
app.disable('x-powered-by')
app.use(morgan("dev"));
app.use(express.json());

app.use(`/api/${process.env.VERSION}/auth`, Auth);
app.use(`/api/${process.env.VERSION}/projects`, Projects);
app.use(`/api/${process.env.VERSION}/users`, Users);

app.use(`/*`, (req, res) => {
    return res.status(404).json({
      message: 'Not found this page',
      status: 404
    });
  });

const port = process.env.PORT
app.listen(port || 5000, () => console.log('SERVER IS LISTENING ==> ' + `http://localhost:${port || 5000}`))
