// const { error } = require("console");
const fs = require("fs")
const os = require("os")

// Async..method

// fs.writeFile("ex1.txt", "Async file", (err) => {});

// Sync..method

// fs.writeFileSync("./Example.txt", "Hii from example")

// Sync..method

// const result = fs.readFileSync("./contacts.txt", "utf-8")
// console.log(result)

// Async..method

// fs.readFile("./contacts.txt", "utf-8", (error, result) => {
//     if(error){
//         console.log(error)
//     }else{
//         console.log(result)
//     }
// });

// Appends the files

// fs.appendFileSync("./contacts.txt", "Contacts Add\n")

// Copy the file

// fs.cpSync("contacts.txt", "copy.txt")

// Delete the file

// fs.unlinkSync("./copy.txt")


// no of threads calculate by cpus

console.log(os.cpus().length)