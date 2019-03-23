// using nodemon
nodemon watches existing files for updates
if you have a new file, have to restart the server

// update package.json - main to server.js

// using express

// using hogan
npm i hjs --save

// using path which is native to nodejs

// using mongoose with mongodb
npm i mongoose --save

// on first POST, mongo returns _id and __v (version)
{"email":"Justin","password":"houais","_id":"5c94ebcc593d9436440ea98a","timestamp":"2019-03-22T14:06:04.198Z","__v":0}

// using passport for login via FB, Google, etc (we're just using basic )
npm i passport --save
// sub-library
npm i passport-local --save
Notes - each login flow is called a strategy, we're doing 'local strategy'

// session library, saves session in a cookie
npm i express-session --save

// Win powershell create file
https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-6
New-Item -Path . -Name "testfile1.txt" -ItemType "file" -Value "This is a text string."