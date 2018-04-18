 var exec = require('child_process').exec;
const comandos = '.\sounder.exe audio.wav'


 exec('.\\sounder.exe audio1.wav', function(error, stdout, stderr){
   console.log(stdout);
 });
