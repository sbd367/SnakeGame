$(document).ready(function(){

    const GAME_CANVAS_BACKGROUND = "black",
          GAME_CANVAS_BORDER = 'green';

    var gameCanvas = document.getElementById('gameCanvas'),
        ctx = gameCanvas.getContext('2d');

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

    let score = 0,
        dx = +10,
        dy = 0;

    var drawSnakePart = snakePart =>{
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'orange';

        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    var changeDirection = event => { 
        
        const RIGHT_KEY = 39,
              LEFT_KEY = 37,
              UP_KEY = 38,
              DOWN_KEY = 40;

        const keyPressed = event.keyCode,
              goingDown = dy === 10,
              goingRight = dx === 10,
              goingLeft = dx === -10;

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
        
        if(didGameEnd()){
            $('#modal1').show();
            $('#endGame').append("you lost whith a score of: " + score)
            return
        }

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

        const hitLeftWall = snake[0].x < 0,
              hitRightWall = snake[0].x > gameCanvas.width - 10,
              hitToptWall = snake[0].y < 0,
              hitBottomWall = snake[0].y > gameCanvas.height - 10;

        return hitLeftWall || 
                hitRightWall || 
                hitToptWall ||
                hitBottomWall
    }

    $('button#playAgain').on('click', () =>{
        window.location.reload();
    });

    $.getJSON("/api/theScores", data => {
        var results = [];
        for(i=0; i < data.length; i++){
           results.push(data[i])
        };

        var sortedRes = results.sort((a, b) => (a.Points < b.Points) ? 1 : -1);
        sortedRes.slice(0, 5).forEach( (element, i) => {
           $('#scoreboard').append(
           `<tr id="score${i}">
             <td id="user${i}">${element.Username}</td>
             <td id="user${i}">${element.Points}</td>
            </tr>`
          );
        });
    });

    $('#submit').on('click', () =>{
        let UN = $('.username').val();
        $('#modal1').hide();
        $('#sucessModal').show();
        $.post('/api/scores', 
         {
            Username: UN,
            Points: score
         }, (data, status) =>{
            console.log("data: "+ data + "======= Status: "+ status)
         })
    })
    createFood();
    main();
})