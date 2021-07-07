soundtrack_1="";
soundtrack_2="";
leftwrist_x=0;
leftwrist_y=0;
leftwrist_score=0;
rightwrist_x=0;
rightwrist_y=0;
rightwrist_score=0;
function preload() {
    soundtrack_1=loadSound("music.mp3");
    soundtrack_2=loadSound("music2.mp3")
}
function setup() {
    video=createCapture(VIDEO);
    video.hide();
    canvas=createCanvas(800,600);
    canvas.center();
    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on('pose',getResults);
}
function draw() {
    image(video, 0,0,800,600);
}


function getResults(results) {
    if (results.length>0) {
        console.log(results);
        leftwrist_x=results[0].pose.leftWrist.x;
        leftwrist_y=results[0].pose.leftWrist.y;
        leftwrist_score=results[0].pose.keypoints[9].score;
        rightwrist_x=results[0].pose.rightWrist.x;
        rightwrist_y=results[0].pose.rightWrist.y;
        rightwrist_score=results[0].pose.keypoints[10].score;
    }
}

function modelLoaded() {
    console.log("PoseNet Initialized");
}

function draw() {
    image(video, 0,0,800,600);
    soundtrackStatus1=soundtrack_1.isPlaying(); 
    soundtrackStatus2=soundtrack_2.isPlaying(); 
    fill('blue');
    if (leftwrist_score>0.2) {
        circle(leftwrist_x, leftwrist_y,20);
        soundtrack_2.stop();
        if (soundtrackStatus1==false) {
            soundtrack_1.play();
            document.getElementById("playing_song").innerHTML="Song 1 is playing";
        } 
    }
    if (rightwrist_score>0.2) {
        circle(rightwrist_x, rightwrist_y,20);
        soundtrack_2.stop();
        if (soundtrackStatus2==false) {
            soundtrack_2.play();
            document.getElementById("playing_song").innerHTML="Song 2 is playing";
        } 
    }


}





    

