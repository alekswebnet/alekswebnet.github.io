/* timeSeller.js v.1.0.0 plugin by redrobot753 */

// Variables

var popup = document.querySelectorAll('.timeSeller')[0];
var randName = document.querySelectorAll('.timeSeller-name')[0];
var randNum = document.querySelectorAll('.timeSeller-num')[0];

var popupTime = 3000;
var popupDelay = 3000; 
var timer = 600000;

// Names array

var chooserName = randomNoRepeats(['Jacob','Emily','Michael','Emma','Joshua','Madison','Matthew','Olivia','Ethan','Hannah','Andrew','Abigail','Daniel','Isabella','William','Ashley','Joseph','Samantha','Christopher','Elizabeth','Anthony','Alexis','Ryan','Sarah','Nicholas','Grace','David','Alyssa','Alexander','Sophia','Tyler','Lauren','James','Brianna','John','Kayla','Dylan','Natalie','Nathan','Anna','Jonathan','Jessica','Brandon','Taylor','Samuel','Chloe','Christian','Hailey','Benjamin','Ava','Zachary','Jasmine','Logan','Sydney','Jose','Victoria','Noah','Ella','Justin','Mia','Elijah','Morgan','Gabriel','Julia','Caleb','Kaitlyn','Kevin','Rachel','Austin','Katherine','Robert','Megan','Thomas','Alexandra','Connor','Jennifer','Evan','Destiny','Aidan','Allison','Jack','Savannah','Luke','Haley','Jordan','Mackenzie','Angel','Brooke','Isaiah','Maria','Isaac','Nicole','Jason','Makayla','Jackson','Trinity','Hunter','Kylie','Cameron','Kaylee','Gavin','Paige','Mason','Lily','Aaron','Faith','Juan','Zoe','Kyle','Stephanie','Charles','Jenna','Luis','Irea','Adam','Riley','Brian','Katelyn','Aiden','Angelina','Eric','Kimberly','Jayden','Madeline','Alex','Mary','Bryan','Leah','Sean','Lillian','Owen','Michelle','Lucas','Amia','Nathaniel','Sara','Ian','Sofia','Jesus','Jordan','Carlos','Alexa','Adrian','Rebecca','Diego','Gabrielle','Julian','Caroline','Cole','Vanessa','Ashton','Gabriella','Steven','Avery','Jeremiah','Marissa','Timothy','Ariana','Chase','Audrey','Devin','Jada','Seth','Autumn','Jaden','Evelyn','Colin','Jocelyn','Cody','Maya','Landon','Arianna','Carter','Isabel','Hayden','Amber','Xavier','Melanie','Wyatt','Diana','Dominic','Danielle','Richard','Sierra','Antonio','Leslie','Jesse','Aaliyah','Blake','Erin','Sebastian','Amelia','Miguel','Molly','Jake','Claire','Alejandro','Bailey','Patrick','Melissa']);

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function randomNoRepeats(array) {
  var copy = array.slice(0);
  return function() {
    if (copy.length < 1) { copy = array.slice(0); }
    var index = Math.floor(Math.random() * copy.length);
    var item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}

// Show random popups

var timerId = setInterval(function() {
  randNum.textContent = randomInteger(500, 5000); // Set min & max number
  randName.textContent = chooserName();
  popup.classList.toggle('js-show');
  setTimeout(function() { 
    popup.classList.toggle('js-show'); 
  }, popupTime);
}, popupDelay+popupTime);

// Duration

setTimeout(function() {
  clearInterval(timerId);
}, timer);


