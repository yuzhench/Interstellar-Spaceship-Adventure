/* ------------- Winter 2024 EECS 493 Assignment 3 Starter Code ------------ */

/* ------------------------ GLOBAL HELPER VARAIBLES ------------------------ */
// Difficulty Helpers
let astProjectileSpeed = 3;            // easy: 1, norm: 3, hard: 5



//-------------------------------------modification
var spaceship; 

let currentShield = 1;
let currentPort = 1;
let currentShip = 1;

// var KEYS = {
//   left: 37, 
//   right: 39, 
//   up: 38,
//   down: 40,
//   spacebar: 32,
//   shift: 16
// }


let first_time_game = true;
//#############################Define the current difficulty#########
let curr_difficulty = ''; 
//#############################Score board data:#####################
let curr_danger = 1;
let curr_score = 0;
let curr_level = 1;

//#############################Define all the intervals################
let asteroid_interval;
let interval_of_port;
let interval_of_sheild;
let interval_of_score;
let ship_interval;
let if_collision_asteroid_interval;
let if_collision_shield_interval;
let if_collision_port_interval;


//##############################Shield, port appear or not###############
let player_protected = false;
let shield_appear = false; 
let port_appear = false;

//initialize the player level to be 1
// let player_level = 1;
var state = '';

//------------------------------------------------
// Game Object Helpers
let currentAsteroid = 1;
const AST_OBJECT_REFRESH_RATE = 15;
const maxPersonPosX = 1218;
const maxPersonPosY = 658;
const PERSON_SPEED = 2;                // #pixels each time player moves by
const portalOccurrence = 15000;        // portal spawns every 15 seconds
const portalGone = 5000;               // portal disappears in 5 seconds
const shieldOccurrence = 10000;        // shield spawns every 10 seconds

const shieldGone = 5000;               // shield disappears in 5 seconds

// Movement Helpers
let LEFT = false;
let RIGHT = false;
let UP = false;
let DOWN = false;

// TODO: ADD YOUR GLOBAL HELPER VARIABLES (IF NEEDED)

/* --------------------------------- MAIN ---------------------------------- */
$(document).ready(function () {
  // jQuery selectors
  game_window = $('.game-window');
  game_screen = $("#actual-game");
  asteroid_section = $('.asteroidSection');
  // hide all other pages initially except landing page
  game_screen.hide();

  /* -------------------- ASSIGNMENT 2 SELECTORS BEGIN -------------------- */
   // TODO: DEFINE YOUR JQUERY SELECTORS HERE
  // $('.play-game-button').on('click', function () {
  //   playGame();
  // });

  // // Event handler for the "Settings" button
  // $('.settings-button').on('click', function () {
  //     openSettings();
  // });

  // $(document).ready(function () {
  // });
  /* --------------------- ASSIGNMENT 2 SELECTORS END --------------------- */
  adjust_volume();
  // TODO: DEFINE YOUR JQUERY SELECTORS (FOR ASSIGNMENT 3) HERE

  // Example: Spawn an asteroid that travels from one border to another
  // spawn(); // Uncomment me to test out the effect!

  $('.settings-button').on('click', function () {
    openSettings();
  });

  
  console.log("restart the position of the spaceship");
  spaceship = $(".spaceship"); 

  // spaceship.css("display", "inline-block");//----->test change here to solve the problem that
  //the ship show in the screen at the beginning

  // ship_interval = setInterval(function() {
  //   ship_movement();
  // }, 0);
   
   

});


/* ---------------------------- EVENT HANDLERS ----------------------------- */
// // Keydown event handler
// document.onkeydown = function (e) {
//   if (e.key == 'ArrowLeft') LEFT = true;
//   if (e.key == 'ArrowRight') RIGHT = true;
//   if (e.key == 'ArrowUp') UP = true;
//   if (e.key == 'ArrowDown') DOWN = true;
// }

// // Keyup event handler
// document.onkeyup = function (e) {
//   if (e.key == 'ArrowLeft') LEFT = false;
//   if (e.key == 'ArrowRight') RIGHT = false;
//   if (e.key == 'ArrowUp') UP = false;
//   if (e.key == 'ArrowDown') DOWN = false;
// }

/* ------------------ ASSIGNMENT 2 EVENT HANDLERS BEGIN ------------------ */
function playGame() {
  $('.setting-page').toggle();
}

function openSettings() {
  // alert('Opening settings!');
  // Add your settings logic here
  $('.mainMenu').toggle();
  $('.tutorials-page').toggle();
}

function changeBorderColor(button, buttonID) {
  // Remove 'clicked' class from all buttons
  const allButtons = document.querySelectorAll('.seting-button');
  allButtons.forEach(btn => {
      btn.classList.remove('clicked');
  });

  // Toggle the 'clicked' class to change the border color for the clicked button
  button.classList.toggle('clicked');

  //use the button ID to choose from easy medium or hard 
  if (buttonID == "easy_id"){
    curr_difficulty = "easy";
    curr_danger = 10;
  }

  else if (buttonID == "normal_id"){
    curr_difficulty = "normal";
    curr_danger = 20;
  }

  else if (buttonID == "hard_id"){
    curr_difficulty = "hard"
    curr_danger = 30;
  }
}

function goBackToMenu(){
  $('.setting-page').toggle();
}



function start_get_ready_page(){
  //check if the user customize the difficulty in the setting 
  console.log("start_get_ready_page");
  console.log("current_danger_level is: ", curr_danger);
  
  

  if (curr_difficulty == ''){
    curr_difficulty = "normal";
    // alert("enter this ");
    curr_danger = 20;
  }


  //remember the old setting 
  if (curr_difficulty == "easy"){
    curr_danger = 10;
  }

  if (curr_difficulty == "normal"){
    curr_danger = 20;
  }

  if (curr_difficulty == "hard"){
    curr_danger = 30;
  }

  //show the get ready page 
  if (first_time_game == true){
    $('#actual-game').css('display', 'inline-block');
  }
  $('.scorePage').css("display", 'flex');

  //reset the spaceship position 
  if (first_time_game == false){
    console.log("reset the spaceship position")
    $(".spaceship").css("position", "absolute");
    $(".spaceship").css("left", "590px");
    $(".spaceship").css("top", "400px");

    console.log("left position is: ", $(".spaceship").css("left"));
  }
  
  //hid the tutorial page 
  $(".tutorials-page").css('display', 'none')

  //initial the current score, the current danger and the current level 
  curr_score = 0;
  $(".current-score").text(curr_score);
  curr_danger = curr_danger;
  $(".current-danger").text(curr_danger);
  curr_level = 1; 
  $(".current-level").text(curr_level);

  if (first_time_game == true){
    setTimeout(function(){
     
      console.log("finish 3 second waiting");
         
      $('#actual-game').hide();
      //start to set up the ship, astroid, shield
      console.log("before start to enter start_game");
  
      // test_function();
       
       
      start_game(curr_difficulty);
      console.log("current difficulty is: ", curr_difficulty);
    }, 3000);
    first_time_game = false;
  }
  else{
    start_game(curr_difficulty);
    console.log("current difficulty is: ", curr_difficulty);
  }

   


}

// function test_function(){
//   console.log("enter the text function");
// }


function start_game(curr_difficulty){
  console.log("left position is: ", $(".spaceship").css("left"));
  console.log("enter start_game function ");
  //show the spaceship
  // $(".spaceship").css("right", "50%");
  // console.log("the right position of the ship is: ", $(".spaceship").css("right"));
  // $(".spaceship").css("top", "70%");



  //spaceship
  $(".spaceship").css("display", "inline-block");
  console.log("left position is: ", $(".spaceship").css("left"));

  // alert("show the spaceship right now ");
  console.log("enter this function");
  //Astoid
  asteroid_interval = setInterval(function () {
    spawn();
  }, get_spawn_rate(curr_difficulty));

  //score
  interval_of_score = setInterval(function(){
    curr_score += 40;
    //update the sore number on the score page 
    $(".current-score").text(curr_score);
  },500);
  console.log(curr_score);

  //ship
  ship_interval = setInterval(function() {
    ship_movement();
  }, 0);

  //shield
  interval_of_sheild = setInterval(function(){
    shield_show();
  },shieldOccurrence);

  //port
  interval_of_port = setInterval(function(){
    port_show();
  },portalOccurrence);

  //check collision with the asteroid
  if_collision_asteroid_interval = setInterval(function(){
    if_collide_asteroid();
  },0);
  
  //check collision with shield
  if_collision_shield_interval = setInterval(function(){
    if_collide_shield();
  },0);

  //check collision with port
  if_collision_port_interval = setInterval(function(){
    if_collide_port();
  },0);
}

 
 
/* ------------------- ASSIGNMENT 2 EVENT HANDLERS END ------------------- */

// TODO: ADD MORE FUNCTIONS OR EVENT HANDLERS (FOR ASSIGNMENT 3) HERE


 

// function hide_page(){
//     // var ready_page = document.getElementById("ready-page-flex-container");
//     // // alert("remove the page");
//     // ready_page.style.display = 'none'
//     $('#ready-page-flex-container').hide();
     
// }

// function start_game(difficulty){
//   // spawn();

//   // setInterval(function () {
//   //   spawn();
//   //   // spawnPortalsAndShields();
//   //   // shield_show();

//   // }, get_spawn_rate(difficulty));

//   // console.log(get_spawn_rate(difficulty));
//   // console.log(astProjectileSpeed);

//   // // console.log("!!!!!!!!!!!!!!!!!!!!");


//   // // spaceship_show();

//   // //update the score in a certain time
//   // interval_of_score = setInterval(function(){
//   //   curr_score += 40;
//   //   //update the sore number on the score page 
//   //   //to do
//   // });

//   // interval_of_sheild = setInterval(function(){
//   //   shield_show();
//   // },shieldOccurrence);

//   // interval_of_port = setInterval(function(){
//   //   port_show();
//   // },portalOccurrence);

//   // setInterval(function(){
//   //   if_collide_asteroid();
//   // },0);
  
//   // setInterval(function(){
//   //   if_collide_shield();
//   // },0);

//   // setInterval(function(){
//   //   if_collide_port();
//   // });
// }

function get_spawn_rate(curr_difficulty){
  switch (curr_difficulty) {
    case 'easy':
      astProjectileSpeed = 1;
      return 1000;
    case 'normal':
      astProjectileSpeed = 3;
      return 800;
    case 'hard':
      astProjectileSpeed = 5;
      return 600;
  }
}

 



// $(document).ready(function () {
//   // Call the spawn function when the document is ready     <--------------------try 
//   spawn();
// });


//#####################################shield#############################################
function shield_show(){
  shield_appear = true;
  let objectString = "<div class ='curShield'><img src = 'src/shield.gif'/></div>";
  $(".shieldSection").append(objectString);

  var x_right = getRandomNumber(0, maxPersonPosX);
  var y_top = getRandomNumber(0, maxPersonPosY);
  $('.curShield').css('right', x_right);
  $('.curShield').css('top', y_top);

  setTimeout(function(){
    //remove the shield from the screen 
    $('.shieldSection .curShield').remove();
    shield_appear = false;
  },shieldGone);
}

 

//########################################port#########################################
function port_show(){
  port_appear = true;
  let objectString = "<div class ='curPort'><img src = 'src/port.gif'/></div>";
  $(".portSection").append(objectString);

  var x_right = getRandomNumber(0, maxPersonPosX);
  var y_top = getRandomNumber(0, maxPersonPosY);
  $('.curPort').css('right', x_right);
  $('.curPort').css('top', y_top);

  setTimeout(function(){
    //remove the shield from the screen 
    $('.portSection .curPort').remove();
    port_appear = false;
  },portalGone);
}

//############################################ship##############################


document.onkeydown = function (event){
  if (event.key == 'ArrowLeft'){
    LEFT = true;
    console.log("LEFT", LEFT);
  }
  if (event.key == 'ArrowRight'){
    RIGHT = true;
  }
  if (event.key == 'ArrowUp'){
    UP = true;
  }
  if (event.key == 'ArrowDown'){
    DOWN = true;
  }
}

document.onkeyup = function(event) {
  if (event.key == 'ArrowLeft'){
    LEFT = false;
  }
  if (event.key == 'ArrowRight'){
    RIGHT = false;
  }
  if (event.key == 'ArrowUp'){
    UP = false;
  }
  if (event.key == 'ArrowDown'){
    DOWN = false;
  }
}

function ship_movement() {
  var currentLeft = parseInt(spaceship.css("left"));
  var currentTop = parseInt(spaceship.css("top"));

  var newLeft = currentLeft;
  var newTop = currentTop;

  // console.log("!!!!!!!!!!!!!!!!!!!!!!!");
  if (LEFT) {
    $('.spaceship img').attr('src', 'src/player/player' + state + '_left.gif');
    newLeft = currentLeft - PERSON_SPEED; 
  } 

  if (UP) {
    $('.spaceship img').attr('src', 'src/player/player' + state + '_up.gif');
    newTop = currentTop - PERSON_SPEED; 
  }

  if (DOWN) {
    $('.spaceship img').attr('src', 'src/player/player' + state + '_down.gif');
    newTop = currentTop + PERSON_SPEED; 
  }

  if (RIGHT) {
    $('.spaceship img').attr('src', 'src/player/player' + state + '_right.gif');
    newLeft = currentLeft + PERSON_SPEED; 
  }

  if (!LEFT && !RIGHT && !UP && !DOWN){
    $('.spaceship img').attr('src', 'src/player/player' + state + '.gif');
  }

  // Boundary checks
  if (newTop < 0) {
    newTop = 0; 
  } else if (newTop > maxPersonPosY) {
    newTop = maxPersonPosY; 
  }
  if (newLeft < 0) {
    newLeft = 0; 
  } else if (newLeft > maxPersonPosX) {
    newLeft = maxPersonPosX; 
  }

  // Update position
  spaceship.css({
    "top": newTop,
    "left": newLeft
  });
}


//#############################Check_asteroid_colision##############################
function if_collide_asteroid(){
  //loop through all the asteroid
  $('.asteroidSection .curAsteroid').each(function(){
    // if the ship has the protection 
    if ( player_protected == true){
      if (willCollide($('.spaceShip'),$(this),0,0) == true){
        // alert("you already use the sheild");
        //the shield is broken 
        player_protected = false;
        //remove the asteroid from the screen 
        $(this).remove();
        state = '';
        //change the image back to the space without the protection 
        $('.spaceship img').attr('src', 'src/player/player' + state +'.gif');

        //restart the shield appear system
        // alert("restart the shield system");
        interval_of_sheild = setInterval(function(){
          shield_show();
        },shieldOccurrence);


      }
    }
    //if the user don't have the protection
    else{
      // console.log("enter this condition");
      if (willCollide($('.spaceShip'),$(this),0,0) == true){
        state = '_touched'
         //change the image back to the space with fire 
        $('.spaceship img').attr('src', 'src/player/player' + state + '.gif');

        //play the die audio 
        var audioElement = $(".die_sound").get(0);
        audioElement.play();
        // alert("gave over");

        //clean all the global variable 
        curr_danger = 0;
        curr_level = 1;
        //curr_difficulty = '';

        //remove from any condition: shielded shield appear port apear
        player_protected = false;
        shield_appear = false;
        port_appear = false;
        //initialize the sapceship state 
        state = '';
        //clean the old one currentDanger
        clearInterval(asteroid_interval);
        clearInterval(interval_of_port);
        clearInterval(interval_of_sheild);
        clearInterval(interval_of_score);
        clearInterval(ship_interval);
        clearInterval(if_collision_asteroid_interval);
        clearInterval(if_collision_shield_interval);
        clearInterval(if_collision_port_interval);

        //stop all the asteroid 
        astProjectileSpeed = 0;

         
         

        //pause the screen for 2 second
        setTimeout(function(){
          //close the actual_game window 
          $(".actual-game").css("display", "none");
          //remove all the asteroids
          $(".asteroidSection .curAsteroid").css("display", "none");
          //remove all the shield
          $(".shieldSection .curShield").css("display", "none");
          //remove all the port 
          $(".portSection .curPort").css("display", "none");
          //remove the spaceship
          $(".spaceship").css("display", "none");
           
          //close the sore page
          $(".scorePage").css("display", "none");

          // show the mainMenu
          $(".mainMenu").css("display", "block");

          //show the gave over page
          $('.gameOverSection').css("display", "flex");
          $(".final_game_score").text(curr_score);
          curr_score = 0;
        },2000);

      
      }
    }
  }

  );
}

function restart_game(){
  $(".gameOverSection").css("display", "none");
  //place the spaceship locaton to the original 
}

//#######################################Check_collide_shield##############################################

function if_collide_shield(){
  if (shield_appear == true){
    //check if the spaceship is in the same location as the shield 
    if (willCollide($(".spaceship"), $('.curShield'),0,0) == true){
      // alert("you get a protected shield");

      //the player will be protected later
      player_protected = true;
      //the shield will not show up later 
      shield_appear = false;
      //then we need to change the display of the ship 
      state = '_shielded';

      //remove the current sheild 
      $('.curShield').css("display", "none");
      //clean the current shield interval
      clearInterval(interval_of_sheild);
      //palye the audio 
      var audioElement = $(".collect_sound").get(0);
      audioElement.play();

      //paulse the appear of the shield 
      //to do ?

    }
  }
}

//#######################################Check_collide_port##############################################
function if_collide_port(){
  if (port_appear == true){
    //check if the spaceship is in the same location as the shield 
    if (willCollide($(".spaceship"), $('.curPort'),0,0) == true){

      // alert("you are in a port");

      // //increase the player level 
      // player_level == true;
      //increase the spead of the astroid later 
      astProjectileSpeed += 0.5
       
      //update the danger in the score board 
      curr_danger += 2;
      $(".current-danger").text(curr_danger);
      //update the level in the score board
      curr_level += 1;
      $(".current-level").text(curr_level);
       
      //remove the portal on the screen 
      $(".curPort").css("display", "none");

      //reset the portal repeating interval 
      clearInterval(interval_of_port);

      
      //start the new one 
      interval_of_port = setInterval(function(){
        port_show();
      },portalOccurrence);
      //palye the audio 
      var audioElement = $(".collect_sound").get(0);
      audioElement.play();

       
    }
  }
}

//#######################################Adjust_volume##############################################

function adjust_volume(){
  var $slider = $('#myRange');
  var $output = $('#volume-value');
  $output.html($slider.val());

  $slider.on('input', function () {
    $output.html($(this).val());
  });

  //get the current colume value
  let audio_volume = $slider.val();
  //calculate the scale value 
  let volume_scaler = audio_volume / 100; 
  //change the volume of collect and die 
  $(".collect_sound").prop("volume", volume_scaler);
  $(".die_sound").prop('volume', volume_scaler);

}




//###################################################################################
/* ---------------------------- GAME FUNCTIONS ----------------------------- */
// Starter Code for randomly generating and moving an asteroid on screen
class Asteroid {
  // constructs an Asteroid object
  constructor() {
    /*------------------------Public Member Variables------------------------*/
    // create a new Asteroid div and append it to DOM so it can be modified later
    let objectString = "<div id = 'a-" + currentAsteroid + "' class = 'curAsteroid' > <img src = 'src/asteroid.png'/></div>";
    asteroid_section.append(objectString);
    // select id of this Asteroid
    this.id = $('#a-' + currentAsteroid);
    currentAsteroid++; // ensure each Asteroid has its own id
    // current x, y position of this Asteroid
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Asteroid
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Asteroid has reached the boarder
    this.hide_axis = 'x';
    this.hide_after = 0;
    this.sign_of_switch = 'neg';
    // spawn an Asteroid at a random location on a random side of the board
    this.#spawnAsteroid();
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Asteroid has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    if (this.hide_axis == 'x') {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_x > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_x < this.hide_after) {
          return true;
        }
      }
    }
    else {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_y > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_y < this.hide_after) {
          return true;
        }
      }
    }
    return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Asteroid 1 unit in its designated direction
  updatePosition() {
    // ensures all asteroids travel at current level's speed
    this.cur_y += this.y_dest * astProjectileSpeed;
    this.cur_x += this.x_dest * astProjectileSpeed;
    // update asteroid's css position
    this.id.css('top', this.cur_y);
    this.id.css('right', this.cur_x);
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Asteroid
  //          all asteroids travel at the same speed
  #spawnAsteroid() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS
    let x = getRandomNumber(0, 1280);
    let y = getRandomNumber(0, 720);
    let floor = 784;
    let ceiling = -64;
    let left = 1344;
    let right = -64;
    let major_axis = Math.floor(getRandomNumber(0, 2));
    let minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = 784;
      this.sign_of_switch = 'pos';
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = 1344;
      this.sign_of_switch = 'pos';
    }
    // show this Asteroid's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Asteroids travel at the same speed
    let speed = Math.sqrt((this.x_dest) * (this.x_dest) + (this.y_dest) * (this.y_dest));
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}

// Spawns an asteroid travelling from one border to another
function spawn() {
  let asteroid = new Asteroid();
  setTimeout(spawn_helper(asteroid), 0);
}

function spawn_helper(asteroid) {
  let astermovement = setInterval(function () {
    // update Asteroid position on screen
    asteroid.updatePosition();
    // determine whether Asteroid has reached its end position
    if (asteroid.hasReachedEnd()) { // i.e. outside the game boarder
      asteroid.id.remove();
      clearInterval(astermovement);
    }
  }, AST_OBJECT_REFRESH_RATE);
}

/* --------------------- Additional Utility Functions  --------------------- */
// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange) {
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange) {
  const o1D = {
    'left': o1.offset().left + o1_xChange,
    'right': o1.offset().left + o1.width() + o1_xChange,
    'top': o1.offset().top + o1_yChange,
    'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = {
    'left': o2.offset().left,
    'right': o2.offset().left + o2.width(),
    'top': o2.offset().top,
    'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
    // collision detected!
    return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}
