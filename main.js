function setup() {
  canvas = createCanvas(450, 300);
  canvas.position(540, 370);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}
function modelLoaded()
{
  console.log('Modelo Carregado');
}

function draw()
{
  image(video, 0, 0, 450, 300);
  classifier.classify(video, gotResult);
}
var previousResult = '';
function gotResult(error, results) 
{
  if(error)
  {
    console.error(error);
  }
  else
  {
    if((results[0].confidence > 0.5) && (previousResult != results[0].label))
    {
      console.log(results);
      previousResult = results[0].label;
      var synth = window.speechSynthesis;
      speakData = 'O objeto detectado é: '+results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speakData);
      synth.speak(utterThis);

      document.getElementById("resultObjectName").innerHTML = results[0].label;
      document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3);

    }
  }
}

