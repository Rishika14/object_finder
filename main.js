video="";
status = "";
objects = [];
object = "";

function setup()
{
    canvas=createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 310);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+ objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+percent + "%", objects[i].x + 15, objects[i].y + 15);
    
            if(objects[i]==object)
            {
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                noFill();
                stroke("#FF0000");
                rect(object[i].x, object[i].y, object[i].width, object[i].height);
                video.stop();
                objectDetector.detect(gotResult);
            }
            else
            {
             
            }
        }
    }
}

function gotResult(error, results) {
if(error) {
    console.log(error);
}
console.log(results);
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("object").value;
    console.log(object);
}

function modelLoaded()
{
    console.log("Model Loaded!!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}