// Set constraints for the video stream
//var front = false;
//var constraints = {video: {facingMode:'user'}, audio: false };
//var constraints = {video: {facingMode:"environment"}, audio: false };
var constraints = {video: {facingMode:{exact: 'user'}}, audio: false};
var constraints2 = {video: {facingMode:{exact: 'environment'}}, audio: false};
//var constraints = {video: {facingMode: (front ? 'user' : 'environment')}};
//var constraints = {video: true, audio: false};
var track = null;


// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraSwitch = document.querySelector("#camera--switch"),
    saveImage = document.querySelector("#save--image"),
    frontCam = document.querySelector("#camera--front"),
    backCam = document.querySelector("#camera--back");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

function cameraStart2() {
    navigator.mediaDevices
        .getUserMedia(constraints2)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture with front cam
frontCam.onclick = function() {
    cameraStart();
}

// Take a picture with back cam
backCam.onclick = function() {
    cameraStart2();
}


// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

// Switch Camera to back/front camera
// cameraSwitch.addEventListener('click', function(){
//    if(stream == null) return
//    stream.getTracks().array.forEach(t => {
//        t.stop();
//    });
//    shouldFaceUser = !shouldFaceUser;
   
// });

// cameraSwitch.onclick = function(){
//     front = !front; 
// };

// Save the image to local gallery
saveImage.onclick = function() {
    var gh = cameraOutput.src;
    var a  = document.createElement('a');
    a.href = gh;
    a.download = 'image.png';

    a.click()
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);