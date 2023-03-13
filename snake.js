document.getElementById("start-btn").addEventListener("click", function() {
// 获取canvas元素
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 定义贪吃蛇的初始位置和大小
var snakeX = 20;
var snakeY = 20;
var snakeSize = 20;

// 定义贪吃蛇的移动方向
var direction = "right";

// 定义食物的位置
var foodX = Math.floor(Math.random() * canvas.width / snakeSize) * snakeSize;
var foodY = Math.floor(Math.random() * canvas.height / snakeSize) * snakeSize;

// 定义贪吃蛇的身体
var snakeBody = [{ x: snakeX, y: snakeY }, { x: snakeX - snakeSize, y: snakeY }, { x: snakeX - 2 * snakeSize, y: snakeY }];

function isGameOver() {
    // 撞到边框
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
        return true;
    }
    // 撞到自身
    for (var i = 1; i < snakeBody.length; i++) {
        if (snakeBody[i].x == snakeX && snakeBody[i].y == snakeY) {
            return true;
        }
    }
    return false;
}

// 绘制贪吃蛇和食物
function draw() {
    // 清空canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制食物
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, snakeSize, snakeSize);

    // 绘制贪吃蛇
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black"; // 添加边框颜色
    for (var i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i].x, snakeBody[i].y, snakeSize, snakeSize);
        ctx.strokeRect(snakeBody[i].x, snakeBody[i].y, snakeSize, snakeSize); // 绘制边框
    }
}

// 更新贪吃蛇的位置
function update() {
    // 更新贪吃蛇的身体
    for (var i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i].x = snakeBody[i - 1].x;
        snakeBody[i].y = snakeBody[i - 1].y;
    }

    // 更新贪吃蛇的头部
    if (direction == "right") {
        snakeX += snakeSize;
    } else if (direction == "left") {
        snakeX -= snakeSize;
    } else if (direction == "up") {
        snakeY -= snakeSize;
    } else if (direction == "down") {
        snakeY += snakeSize;
    }

    // 更新贪吃蛇的身体
    snakeBody[0] = { x: snakeX, y: snakeY };

    // 判断是否吃到食物
    if (snakeX == foodX && snakeY == foodY) {
        // 生成新的食物
        foodX = Math.floor(Math.random() * canvas.width / snakeSize) * snakeSize;
        foodY = Math.floor(Math.random() * canvas.height / snakeSize) * snakeSize;
        snakeBody.push({ x: snakeBody[snakeBody.length - 1].x, y: snakeBody[snakeBody.length - 1].y });
    }
}

do {
    foodX = Math.floor(Math.random() * canvas.width / snakeSize) * snakeSize;
    foodY = Math.floor(Math.random() * canvas.height / snakeSize) * snakeSize;
} while (foodX == snakeX && foodY == snakeY);
// 防止食物和贪吃蛇头部位置重叠


// 键盘事件监听
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37 && direction != "right") {
        direction = "left";
    } else if (event.keyCode == 38 && direction != "down") {
        direction = "up";
    } else if (event.keyCode == 39 && direction != "left") {
        direction = "right";
    } else if (event.keyCode == 40 && direction != "up") {
        direction = "down";
    }
});

// 游戏循环
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
    if (isGameOver()) {
        alert("游戏结束");
        window.location.replace("about:blank")
    }
}

// 开始游戏
gameLoop();
});
