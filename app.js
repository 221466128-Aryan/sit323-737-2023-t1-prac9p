const express = require("express");
const res = require("express/lib/response");
const app= express();
const winston = require('winston');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
    new winston.transports.Console({
    format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
   });

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

const add = (n1,n2) => {
    return n1 + n2;
}

const sub = (n1,n2) => {
    return n1 - n2;
}

const multi = (n1,n2) => {
    return n1 * n2;
}

const div = (n1,n2) => {
    return n1 / n2;
}

app.get("/add", (req,res) => {
    try{
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    logger.info('Parameters ' + n1+' and '+n2+' received for addition');
    const result = add(n1,n2);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});


app.get("/sub", (req,res) => {
    try {
        const n1= parseFloat(req.query.n1);
        const n2=parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        logger.info('Parameters '+n1+' and '+n2+' received for addition');
        const result = sub(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
        } catch(error) { 
            console.error(error)
            res.status(500).json({statuscocde:500, msg: error.toString() })
        }
});

app.get("/multi", (req,res) => {
    try {
        const n1= parseFloat(req.query.n1);
        const n2=parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        logger.info('Parameters '+n1+' and '+n2+' received for addition');
        const result = multi(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
        } catch(error) { 
            console.error(error)
            res.status(500).json({statuscocde:500, msg: error.toString() })
        }
});


app.get("/div", (req,res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = div(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
        } catch(error) { 
            console.error(error)
            res.status(500).json({statuscocde:500, msg: error.toString() })
        }
});

app.get("/", (req,res) => {
    res.send("Hello!");
});

const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
})