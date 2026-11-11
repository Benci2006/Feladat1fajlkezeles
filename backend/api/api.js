const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { request } = require('http');
const { text } = require('stream/consumers');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});
const readtextfile = async(filePath)=>{

    try{
        const text = await fs.readFile(filePath,"utf8")
        return text
    }
    catch(error){
        throw new Error("Hiba")
    }

}

const upload = multer({ storage });



//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

router.get('/readfile', async(request, response)=>{

    try{
        const utvonal = path.join(__dirname, '../files/adatok.txt')
        const content = await readtextfile(utvonal)
        response.status(200).json({
            text : content
        })
        

    }
    catch(error){
        response.status(500).status({
            message: "Hiba"
        })
    }
        

})

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

module.exports = router;
