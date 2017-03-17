var gcm = require('node-gcm');
var message = new gcm.Message();
// var message = new gcm.Message({
//     //collapseKey: 'demo',
//     priority: 'high',
//     contentAvailable: true,
//     delayWhileIdle: true,
//     timeToLive: 3,
//     restrictedPackageName: "com.ionicframework.app791946",
//     notification: {
//         title: "Hello, World",
//         icon: "ic_launcher",
//         body: "This is a notification that will be displayed if your app is in the background."
//     }
// });
 
//API Server Key
var sender = new gcm.Sender('AAAAvPmxd28:APA91bFVwKxK9DG-hFt9HKYtMF5bbQoNIcDexllomf5CS_hF63YbJsG3sjVAKOkggHaYbv7gHGbfuNiH8tQfMRFMp9knN1BsWuLZpJAXBSMJx25uli-DlInqTqzgxpK1dOxPuFdZG1nV');
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message',"Your Order is complete.");
message.addData('title','Order Status' );
//message.addData('msgcnt','3'); // Shows up in the notification in the status bar
//message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required
registrationIds.push('APA91bF8e0mOMDeQJHFMYLevHMd0xIo-M6DuFe5Sx5SNPLI_Doqsj7Qrxi907xXr8AOk2lbXDmhMImbPa8feCoz_o8CD29ZJi5iKgYYysmBhIjD4QyBuXMBuUp-V9mDC7I91lDtI421I');
registrationIds.push('APA91bEuZA6l13Ws1-z8SHDeOEDRwJ9xVmQzUexi_V24CDiz0FPxup02fRtOQI3Jt1CZ9n1Yhupvcr31kbEYG_i9reFsvh3EWDGJaMh6tmzm8FGRVFsmUobXN7XnnvMrPzedZEwCMsNQ');
registrationIds.push('APA91bFSyf2Oy_1bgIJMH5nzE_pvch4dSkQbdOv3tn9LGy-sWF743GhrkbOLsIQ0B9UQdwmj8E6SOva2lZEjsKAdxyQSw2ERWqPGeYe36x6EL12fxUDgclrCGPWU35jn05zo-uYzg8C_');
//registrationIds.push('APA91bHAuT4sZxectGpAGU4L8aNaLv8D8lxZiSuTbaZOfiLhl54NTJeayIMNoPuHjJe17AhF9-13z4Y5BrqGASxqb0ynu0b_sC13D1nIUSr_HOp2uzZxQqtBGp4OPIuxCawAed8-unaj');
 
/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (err, response) {
    if (err) console.log('Error occured: ',err);
    console.log('Success: ', response);
});