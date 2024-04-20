const { Pool } = require('pg'); 
const pool = 
new Pool({ user: 'postgres', 
host: 'localhost', 
database: 'Talent Acquisition', 
password: '123', 
port: '5432 ', 
max: 20, // Maximum number of clients in the pool 
idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed 
}); 

const http = require('http');
const fs = require('fs');
const path = require('path');

express = require('express');
const app = express();
const port = 3000;
const publicDirectory = path.join(__dirname, 'public');

app.use(express.static(publicDirectory));

app.get('/', function(req, res) {
    // res.sendFile(path.join(publicDirectory, 'index.html'));
    connection.query("SELECT * FROM sigup",(error,rows,fields)=>{
        if(!!error){
            console.log("query not successfull");
        }
        else{
            console.log("connected to images table");
            for(var i=rows.length-1;i>=0;i--){
                adddress.push(rows[i].image);

                imageRows=rows.length;



            }
            
            res.redirect(path.join(publicDirectory, 'index.html'));
            

        }
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

app.get('/',(req,res)=>{
    connection.query("SELECT * FROM sigup",(error,rows,fields)=>{
        if(!!error){
            alert("query not successfull");
        }
        else{
            alert("connected to images table");
            for(var i=rows.length-1;i>=0;i--){
                adddress.push(rows[i].image);

                imageRows=rows.length;



            }
             alert(rows.data);
            //res.redirect(path.join(publicDirectory, 'index.html'));


        }
    });

});




const server = http.createServer((req, res) => {

    // Get the file path from the request URL
    const filePath = path.join(publicDirectory, req.url === '/' ? '/Public/index.html' : req.url);

    // Check if the requested file exists
    fs.exists(filePath, (exists) => {
        if (exists) {
            // Read the file and serve it
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404);
            res.end('File Not Found');
        }
    });
});

// server.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });
 
// // Now you can use the pool to execute querie
function getdata()
{
    pool.query('SELECT * FROM signup ', (err, result) => 
    { if (err) { alert('Error executing query:', err); } 
    else { alert('Query result:', result.rows); } });
}

// pool.query('SELECT * FROM signup ', (err, result) => 
// { if (err) { console.log('Error executing query:', err); } 
// else { console.log('Query result:', result.rows); } });
   

