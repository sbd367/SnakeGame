   $(document).ready(function(){

   const GAME_CANVAS_BACKGROUND = "black";
    const GAME_CANVAS_BORDER = 'green';

    var gameCanvas = document.getElementById('gameCanvas');

    var ctx = gameCanvas.getContext('2d');

    var clearCanvas = () =>{
        ctx.fillStyle = GAME_CANVAS_BORDER;
        ctx.strokeStyle = GAME_CANVAS_BACKGROUND;

        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

    let snake = [
    {x: 250, y: 250},
    {x: 240, y: 250},
    {x: 230, y: 250},
    {x: 220, y: 250}
    ]

    let score = 0;

    let dx = +10;
    let dy = 0;

    var drawSnakePart = (snakePart) =>{
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'orange';

        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    var changeDirection = (event) => { 
        
        const RIGHT_KEY = 39;
        const LEFT_KEY = 37;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        const keyPressed = event.keyCode;
        console.log(keyPressed)
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;

        if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -10;
            dy = 0;
        }
        else if (keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -10;
        }
        else if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 10;
            dy = 0;
        }
        else if (keyPressed === DOWN_KEY && !goingDown) {
            dx = 0;
            dy = 10;
        }
    }

    var drawSnake = () =>{
        snake.forEach(drawSnakePart)
    }

    var advanceSnake = () =>{
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};

        snake.unshift(head);

        const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
        if (didEatFood) {
            createFood();
            score += 10;
            document.getElementById('score').innerHTML = score;
        } else {
            snake.pop();
        }
    }

    function main(){
        
        if(didGameEnd()) return

        setTimeout(function onTick(){
            clearCanvas();
            drawFood();
            advanceSnake();
            drawSnake();
            main();
            document.addEventListener("keydown", changeDirection)
        }, 100);
    }

    var randomTen = (min, max) =>  Math.round((Math.random() * (max-min) + min) / 10) * 10;

    var createFood = () => {

        foodX = randomTen(0, gameCanvas.width - 10);
        foodY = randomTen(0, gameCanvas.height - 10);

        snake.forEach(function isFoodOnSnake(part) {
            const foodIsOnSnake = part.x == foodX && part.y == foodY
            if (foodIsOnSnake)
            createFood();
        });
    }

    function drawFood() {
        ctx.fillStyle = 'orange';
        ctx.strokestyle = 'black';
        ctx.fillRect(foodX, foodY, 10, 10);
        ctx.strokeRect(foodX, foodY, 10, 10);
    }

    function didGameEnd() {

        for (let i = 4; i < snake.length; i++) {
            const didCollide = snake[i].x === snake[0].x &&
            snake[i].y === snake[0].y
            if (didCollide) return true
        }

        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > gameCanvas.width - 10;
        const hitToptWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > gameCanvas.height - 10;

        return hitLeftWall || 
                hitRightWall || 
                hitToptWall ||
                hitBottomWall
    }

    createFood();
    main();
})