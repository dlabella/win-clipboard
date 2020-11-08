var fs = require('fs');
/**
 * Created by tomek on 2016-01-10.
 */
var clipboard = require('./index.js');
// console.log(clipboard.getFormatsCount());
// var formats = clipboard.getFormats();
// console.log(JSON.stringify(formats));
var TEXT = 1;

//List data for all formats available
// formats.forEach(function (format) {
//     console.log('************************************');
//     console.log('Id ', format);
//     console.log('Name: ', clipboard.getFormatName(format));
//     console.log('************************************');
//     var data = clipboard.getData(format);
//     console.log(data);
// });

// console.log("Contains Text:" +clipboard.containsText());
// console.log("Contains Image:" +clipboard.containsImage());

console.log("Clipboard contains: "+clipboard.getFormat());
// saveImage(data);

// function saveImage(data){
//     fs.writeFile("c:\\tmp\\clipboard.png", data, function(err) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("The file was saved!");
//         }
//     });
//   }

// var regex = /<!--StartFragment-->([\s\S]*)<!--EndFragment-->/gm;

// var matches = regex.exec(data);
// if (matches) {
//     console.log(matches[1]);
// }