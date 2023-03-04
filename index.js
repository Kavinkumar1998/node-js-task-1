const fs = require("fs");
const express = require("express");
const path = require("path");
const app= express();
const PORT = 9000;
app.get("/", (req, res) => {
    res.send("hello sir / Mam, Have a Nice Day");
  });

//api for create date-time.txt files

const currentDir =  path.join(__dirname,"Date-time");


    const timestamp = new Date().toString();
    const filename = new Date().toISOString().replace(/:/g, "-") + ".txt";
    const content = timestamp;

    fs.writeFile(`${currentDir}/${filename}`, content,(err=>
        {
            if (err) {
              console.error(err);
             }
             else{
                console.log("file created");
             }
          }));

app.use(express.static("Date-time"));


// api for get datas of each file


app.get("/static",(req,res) => {
    fs.readdir(currentDir, (err, files) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error reading folder");
        }
    
        const fileData = files.map((file) => {
          const content = fs.readFileSync(`${currentDir}/${file}`, "utf8");
          return {
            filename: file,
            content: content,
          };
        });
    
        return res.send(fileData);
      });
});
    app.listen(PORT, () => console.log(`The server started in: ${PORT} `));

    