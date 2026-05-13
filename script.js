const c = document.querySelector("canvas")
const ctx = c.getContext("2d")

let game = {
    current_level: 0,
    levels_cleared: 0,
    gravity: 2,
    levels: [
        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [3, 0, 0, 0, 0, 0, 0, 0, 0,],
                [1, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 1, 0, 0, 0,],
                [0, 2, 0, 0, 0, 0, 0, 1, 1,],
                [0, 0, 0, 0, 1, 1, 0, 0, 0,],
                [1, 1, 1, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 0, 0, 0, 0, 0, 0,],
            ],
            width: 10,
            height: 10,

        },
        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [3, 0, 0, 0, 0, 0, 0, 0, 0,],
                [1, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 1, 0, 0, 0,],
                [0, 2, 0, 0, 0, 0, 0, 1, 1,],
                [0, 0, 0, 0, 1, 1, 0, 0, 0,],
                [1, 1, 1, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 0, 0, 0, 0, 0, 0,],
            ],
            width: 10,
            height: 10,

        },
        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [3, 0, 0, 0, 0, 0, 0, 0, 0,],
                [1, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 1, 0, 0, 0,],
                [0, 2, 0, 0, 0, 0, 0, 1, 1,],
                [0, 0, 0, 0, 1, 1, 0, 0, 0,],
                [1, 1, 1, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 0, 0, 0, 0, 0, 0,],
            ],
            width: 10,
            height: 10,

        },
    ]
}

stored_levels = localStorage.getItem("levels")
if (stored_levels) {
    stored_levels = JSON.parse(stored_levels)
}
else {
    stored_levels = 0
    localStorage.setItem("levels", JSON.stringify(0))
}
game.current_level = stored_levels
const size = [1000, 600]
c.width = size[0]
c.height = size[1]

let player = {
    x: 100,
    y: 60,
    // speed: movement_speed,
    vx: 0,
    vy: 0,
    friction: 0.7, // closer to 1 = more slipp
    acceleration: 5,
    maxSpeed: 10,
    size: 50,
    jump_height: 30,
    grounded: false,
    color: "#3654fe",
    mkeys: {
        "w": false,
        "a": false,
        "s": false,
        "d": false,
        " ": false
    },
    getangle: function () {
        let radians = Math.atan2(this.vy, this.vx);
        let degrees = radians * (180 / Math.PI)
        return { radians: radians, degrees: degrees }
    },
    draw: function () {
        ctx.fillStyle = player.color
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)

    },
   collidesWithLevel: function(testX, testY) {

    const level = game.levels[game.current_level]

    const TILE_W = size[0] / level.width
    const TILE_H = size[1] / level.height

    const half = this.size / 2

    const left = testX - half
    const right = testX + half
    const top = testY - half
    const bottom = testY + half

    const leftTile = Math.floor(left / TILE_W)
    const rightTile = Math.floor(right / TILE_W)

    const topTile = Math.floor(top / TILE_H)
    const bottomTile = Math.floor(bottom / TILE_H)

    for (let ty = topTile; ty <= bottomTile; ty++) {
        for (let tx = leftTile; tx <= rightTile; tx++) {

            if (isSolidTile(tx, ty)) {
                return true
            }
        }
    }

    return false
}
}

document.addEventListener("keydown", (e) => {
    let lkey = e.key.toLowerCase()
    if (player.mkeys[lkey] == undefined || player.mkeys[lkey] == null) return;
    if (player.mkeys[lkey]) return;
    console.log(e.key + " was pressed");
    player.mkeys[lkey] = true



})
document.addEventListener("keyup", (e) => {
    let lkey = e.key.toLowerCase() || e.key
    if (!player.mkeys[lkey]) return;
    player.mkeys[lkey] = false
})

function isSolidTile(tileX, tileY) {
    const level = game.levels[game.current_level]
    if (
        tileX < 0 ||
        tileY < 0 ||
        tileX >= level.width ||
        tileY >= level.height
    ) {
        return true
    }
    return level.tiles[tileY][tileX] === 1
}

function run_frame() {
    ctx.clearRect(0, 0, size[0], size[1]) // clear

    const level = game.levels[game.current_level]
    const block_w = size[0] / level.width
    const block_h = size[1] / level.height
    
    for (let y = 0; y < game.levels[game.current_level].height; y++) {
        for (let x = 0; x < game.levels[game.current_level].width; x++) {

            const tile = game.levels[game.current_level].tiles[y][x];

            if (tile === 1) {
                ctx.strokeStyle = "black"
                ctx.strokeRect(x * block_w, y * block_h, block_w, block_h);
            } else if (tile == 2) {
                ctx.strokeStyle = "blue"
                ctx.strokeRect(x * block_w, y * block_h, block_w, block_h);
            } else if (tile == 3) {
                ctx.strokeStyle = "red"
                ctx.strokeRect(x * block_w, y * block_h, block_w, block_h);
            }
        }
    }
    if (player.mkeys.a) {
        player.vx -= player.acceleration
    }
    if (player.mkeys.d) {
        player.vx += player.acceleration
    }
    if ((player.mkeys[" "] || player.mkeys["w"]) && player.grounded) {
        player.vy -= player.jump_height
        player.grounded = false
    }
    if (Math.abs(player.vx) > player.maxSpeed) {
        player.vx = player.maxSpeed * (player.vx / Math.abs(player.vx))
    }
const nextX = player.x + player.vx

if (!player.collidesWithLevel(nextX, player.y)) {

    player.x = nextX

} else {

    // stop horizontal movement
    player.vx = 0
}




const nextY = player.y + player.vy

if (!player.collidesWithLevel(player.x, nextY)) {

    player.y = nextY
    player.grounded = false

} else {

    // falling onto floor
    if (player.vy > 0) {

        player.grounded = true

    }

    // hitting ceiling
    if (player.vy < 0) {

        // optional ceiling handling
    }

    // stop vertical movement
    player.vy = 0
}

    player.vx *= player.friction
    player.vy += game.gravity
    if ( player.vx <0.0001)player.vx = 0
    player.draw()
    requestAnimationFrame(run_frame)
    // console.log(player.collidesWithLevel())
}
run_frame()