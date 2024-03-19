var canvas;

function preload() {
    classifier = ml5.imageClassifier("DoodleNet")
}


function setup() {
    canvas = createCanvas(400, 380)
    canvas.center();
    canvas.mouseReleased(classifCanvas);
    synth = window.speechSynthesis;

}


function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function classifCanvas() {
    classifier.classify(canvas, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    }
    console.log(results)
    var result = results[0].label;
    document.getElementById("labelObj").innerHTML = "nome: "+ result.replace("_"," ");
    document.getElementById("labelConfidence").innerHTML = "precisão: "+Math.round(results[0].confidence*100)+"%";
    utterThis = new SpeechSynthesisUtterance(result.replace("_"," "));
    synth.speak(utterThis)
    }

function clearCanvas() {
    background("aliceblue")
}