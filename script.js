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
const size = [1000,600]
c.width = size[0]
c.height = size[1]

let player = {
    x: 100,
    y: 100,
    // speed: movement_speed,
    vx: 0,
    vy: 0,
    friction: 0.7, // closer to 1 = more slipp
    acceleration: 5,
    maxSpeed: 10,
    size: 50,
    jump_height:30,
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
        let radians = Math.atan2(vy, vx);
        let degrees = radians * (180 / Math.PI)
        return { radians: radians, degrees: degrees }
    },
    draw: function () {
        ctx.fillStyle = player.color
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)

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

function run_frame() {

    ctx.clearRect(0, 0, size[0], size[1]) // clear
    for (let y = 0; y < game.levels[game.current_level].height; y++) {
        for (let x = 0; x < game.levels[game.current_level].width; x++) {

            const tile = game.levels[game.current_level].tiles[y][x];
            let block_w = size[0]/game.levels[game.current_level].width
            let block_h = size[1]/game.levels[game.current_level].height
            if (tile === 1) {
                ctx.strokeStyle = "black"
                ctx.strokeRect (x*block_w, y*block_h,block_w,block_h);
            } else if (tile == 2){
                ctx.strokeStyle = "blue"
                ctx.strokeRect (x*block_w, y*block_h,block_w,block_h);
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
    if (Math.abs(player.vx > player.maxSpeed)) {
        player.vx = player.maxSpeed * (player.vx / Math.abs(player.vx))
    }
    player.x += player.vx
    player.y += player.vy

    player.vx *= player.friction
    player.vy += game.gravity


    if (player.x - player.size / 2 < 0) { // check for edge collitions
        player.x = player.size / 2
    } else if (player.x + player.size / 2 > size[0]) {
        player.x = size[0] - player.size / 2
    }
    if (player.y - player.size / 2 < 0) {
        player.y = player.size / 2
    } else if (player.y + player.size / 2 > size[1]) {
        player.y = size[1] - player.size / 2
        player.grounded = true
    } else {
        player.grounded = false
    }
    if (player.grounded) {
        player.vy = 0
    }

    player.draw()
    requestAnimationFrame(run_frame)
}
run_frame()