document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground-moving')
    const message = document.querySelector(".message");
    const startButton  = document.querySelector(".startButton");

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let score = 0;

    //initialise the value of status of game to be false at the beginning
    let isGameOver = false
    //mandatory space beteen the teo pipes 
    let gap = 500


    function init() {

        //on clickling the start button, hide the information and then load the game
        startButton.addEventListener("click", startPlay);
    }
    function startPlay(){
    
        message.classList.add("hide");
            function startGame() {

                //positioning the bird on the screen before moving
                birdBottom -= gravity
                bird.style.bottom = birdBottom + 'px'
                bird.style.left = birdLeft + 'px'
            }
            let gameTimerId = setInterval(startGame, 30)


            //in each key presses of the space-bar with the keyCode 32, run the function to fly the bird upward
            function control(e) {
                if (e.keyCode === 32) {
                    flyBird()
                }
            }

            //move the bird upward in every spacebar press
            function flyBird() {
                if (birdBottom < 500) birdBottom += 50
                bird.style.bottom = birdBottom + 'px'
                console.log(birdBottom)
            }
            document.addEventListener('keyup', control)

            //show the pillers at the top and bottom as pillars in ramdomly generated numbers in the limited height
            function generateObstacle() {
                let obstacleLeft = 600
                let randomHeight = Math.random() * 60
                let obstacleBottom = randomHeight
                const obstacle = document.createElement('div')
                const topObstacle = document.createElement('div')

                //keep on generating the pillars until the status of isgameover is false
                if (!isGameOver) {
                    obstacle.classList.add('obstacle')
                    topObstacle.classList.add('topObstacle')
                }
                gameDisplay.appendChild(obstacle)
                gameDisplay.appendChild(topObstacle)
                obstacle.style.left = obstacleLeft + 'px'
                topObstacle.style.left = obstacleLeft + 'px'
                obstacle.style.bottom = obstacleBottom + 'px'
                topObstacle.style.bottom = obstacleBottom + gap + 'px'


                //move the pillars by specific distance in smooth way
                function moveObstacle() {
                    obstacleLeft -=2
                    obstacle.style.left = obstacleLeft + 'px'
                    topObstacle.style.left = obstacleLeft + 'px'

                    if (obstacleLeft === -100) {
                        clearInterval(timerId)
                        gameDisplay.removeChild(obstacle)
                        gameDisplay.removeChild(topObstacle)
                    }
                    if (
                        obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                        (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                        birdBottom === 0 
                        ) {
                        gameOver()
                        clearInterval(timerId)
                    }
                    //updating the score by 1, each time it passes through an obstacle
                    if (birdLeft == obstacleLeft) {
                        score++;
                        const scoreElement = document.querySelector('.score');
                        scoreElement.textContent = "Score :"+ score;
                      }
                }
                
                

            
                let timerId = setInterval(moveObstacle, 10) 
                if (!isGameOver) setTimeout(generateObstacle, 3000)

            }

            //change isgameover status to true when the bird hits any of the pillars or obstacles
            function gameOver() {
                clearInterval(gameTimerId)
                console.log("20000")
                console.log('game over')
                isGameOver = true
               
                // showGameOverScreen();
                document.removeEventListener('keyup', control)
                

                //remove the moving elements after the death of the flappy bird
                ground.classList.add('ground')
                ground.classList.remove('ground-moving')
            }

            //show the pipes on both top and bottom of the game as game star
            generateObstacle();
        }
        init();
    })
    
    
    
    
    // function showGameOverScreen(){
    //     const gameOverMessage = document.createElement('div');
    //     gameOverMessage.textContent = 'Game Over';
    //     gameOverMessage.classList.add('game-over');
   
    //     const restartButton = document.createElement('button');
    //     restartButton.textContent = 'Restart';
    //     restartButton.classList.add('restart-button');
    //     restartButton.addEventListener('click', restartGame);
  
    //     gameDisplay.appendChild(gameOverMessage);
    //     gameDisplay.appendChild(restartButton);
    // }