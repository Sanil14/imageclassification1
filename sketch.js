// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

document.getElementById('image').onchange = function (event) {
    var target = event.target || window.event.srcElement,
        { files } = target;

    if (FileReader && files && files.length > 0) {
        var fr = new FileReader();
        fr.onload = function() {
            console.log(fr.result);
            var image = new Image();
            image.src = fr.result;
            document.body.appendChild(image);
            img = image;
            setupImg();
        }
        fr.readAsDataURL(files[0]);
    }
}

function preload() {
    classifier = ml5.imageClassifier('MobileNet');
    //img = loadImage('https://raw.githubusercontent.com/ml5js/ml5-examples/master/p5js/ImageClassification/ImageClassification/images/bird.jpg');
}

function setup() {
    createCanvas(200, 200);
}

function setupImg() {
    classifier.classify(img, gotResult);
    image(img, 0, 0);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
    // Display error in the console
    if (error) {
        console.error(error);
    } else {
        // The results are in an array ordered by confidence.
        console.log(results);
        createDiv(`Label: ${results[0].label}`);
        createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
    }
}