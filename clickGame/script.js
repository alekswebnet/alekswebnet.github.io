var $game = document.querySelector('#game')
var $startButton = document.querySelector('#startButton')
var $changeTimeButton = document.querySelector('#changeTimeButton')
var $timeInput = document.querySelector('#timeInput')
var $time = document.querySelector('#gameTime')
var $counter = document.querySelector('#gameCounter')
var $changeTimeButton = document.querySelector('#changeTimeButton')
var $timeInput = document.querySelector('#timeInput')

var counter = 0
var isGameStarted = false

var clickWave = new Audio('assets/clickswave.mp3');

$startButton.addEventListener('click', startGame)
$changeTimeButton.addEventListener('click', changeTime)

function changeTime(event) {
  event.preventDefault
  $time.textContent = $timeInput.value +'.0'
}

function startGame() {

  if ($time.textContent > 0 && $time.textContent <= 100) {

    isGameStarted = true
    $counter.textContent = '0'
    counter = 0

    $game.style.backgroundColor = '#fff'
    $startButton.style.display = 'none'
    $startButton.style.visibility = 'hidden'
    $changeTimeButton.setAttribute('disabled', 'disabled')
    $timeInput.style.opacity = '.5'
    
    createBox()
    
    var interval = setInterval(function() {
      var time = parseFloat($time.textContent)
      
      if (time <= 0) {
        clearInterval(interval)
        endGame()
      } else {
        $time.textContent = (time - 0.1).toFixed(1)
      }
    }, 100);
    
  } else {
    $timeInput.focus()
  }

}

function endGame() {
  isGameStarted = false
  $game.style.backgroundColor = '#4CAF50'
  $changeTimeButton.removeAttribute('disabled', 'disabled')
  $timeInput.style.opacity = '1'
  $game.innerHTML = ''
  $time.textContent = $timeInput.value +'.0'

  var startInterval = setInterval(function () {
    $startButton.style.display = 'block'
    $startButton.style.visibility = 'visible'
    $startButton.textContent = 'Повторить игру'
    clearInterval(startInterval)
  },1000)
}

function createBox() {

  $game.innerHTML = ''
  
  var box = document.createElement('div')
  var boxSize = randomNum(35, 80)
  var gameSize = $game.getBoundingClientRect()
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize
  var boxTop = randomNum(0, maxTop)
  var boxLeft = randomNum(0, maxLeft)
  
  box.style.cursor = 'pointer'
  box.style.width = box.style.height = boxSize + 'px'
  box.style.backgroundColor = randomColor()
  box.style.position = 'absolute'
  box.style.opacity = '0'
  box.style.transition = '.5s'
  box.style.left = boxLeft + 'px'
  box.style.top = boxTop + 'px'
  
  $game.appendChild(box)
  box.addEventListener('click', changeBox)

  moveBox()

  function moveBox() {
    var counter = 0
    var id = setInterval(frameBox, 850)

    function frameBox() {
      counter++
      box.style.opacity = '1'
      boxTop = randomNum(0, maxTop)
      boxLeft = randomNum(0, maxLeft)
      box.style.left = boxLeft + 'px'
      box.style.top = boxTop + 'px'
      if (counter > 4) {
        clearInterval(id)
      }  
    }
  }

}

function changeBox() {
    createBox()
    clickWave.play();
    counter++
    $counter.textContent = counter
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



