/* eslint-disable no-console */

import express from 'express';
import Tesseract from 'tesseract.js';
import multer from 'multer';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import fs from 'fs';

import { authLocal, authJwt } from './services/auth.services';
import Data from './models/data.model';
import CryptoJS from 'crypto-js';

const upload = multer({ dest: 'uploads/' });


const app = express();

const encryptText = (text, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, pn) => {
  const key = `${t1.trim()}${t2.trim()}${t3.trim()}${t4.trim()}${t5.trim()}${t6.trim()}${t7.trim()}${t8.trim()}${t9.trim()}${t10.trim()}${pn}`;
  return CryptoJS.AES.encrypt(text.trim(), key);
};

import constants from './config/contanats';
import './config/database';
import middlewareConfig from './config/middlewares';
import apiRoutes from './modules';

middlewareConfig(app);

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/get-data', [authJwt, upload.single('image')], async function (req, res) {
  const data = await Data.findOne({ _id: req.body.id, userId: req.user.id }).lean();

  if (!compareSync(req.body.page_number, data.pageNumber)) {
    return res.json({ success: false, error: 'job failed' });
  }

  let textItems = [];

  for (let k in data) {
    if (k != '_id' && k != 'userId' && k != 'pageNumber' && k != 'mainText' && k != '__v') {
      textItems[k] = data[k];
    }
  }

  var key = {};

  // console.log(req.file);
  let text = '';
  Tesseract.recognize(req.file.path)
    .then(function(result){
        text = result.text.replace(/\s\s+/g, ' ');
        text = text.trim().replace(/\n/g, " ");
        text = text.split(" ");
        var stringArray = new Array();
        for(var i =0; i < text.length; i++){
            stringArray.push(text[i]);
        }
        
        for (let k in textItems) {
          for (let i = 0; i < stringArray.length; i++) {
            if (compareSync(stringArray[i], textItems[k])) {
              key[k] = stringArray[i];
              break;
            }
          }
        }

        fs.unlinkSync(req.file.path);
        // const decryptKey = gene
        console.log(key);

    });
});

app.post('/add-data', authJwt, async function (req, res) {
  const data = await Data.create({
    'userId': req.user.id,
    'text1': hashSync(req.body.text1),
    'text2': hashSync(req.body.text2),
    'text3': hashSync(req.body.text3),
    'text4': hashSync(req.body.text4),
    'text5': hashSync(req.body.text5),
    'text6': hashSync(req.body.text6),
    'text7': hashSync(req.body.text7),
    'text8': hashSync(req.body.text8),
    'text9': hashSync(req.body.text9),
    'text10': hashSync(req.body.text10),
    'pageNumber': hashSync(req.body.page_number),
    'mainText': encryptText(req.body.main_text, req.body.text1, req.body.text2, req.body.text3, req.body.text4, req.body.text5, req.body.text6, req.body.text7, req.body.text8, req.body.text9, req.body.text10, req.body.page_number)
  });

  return res.json({ success: true, message: 'job done' });
});

apiRoutes(app);

app.listen(constants.PORT, () => {
  console.log(`Server is running in ${constants.MODE} mode on port: ${constants.PORT}`);
});
