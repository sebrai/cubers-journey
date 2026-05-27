const c = document.querySelector("canvas")
const ctx = c.getContext("2d")

let game = {
    current_level: 0,
    levels_cleared: 0,
    mx: 0,
    my: 0,
    gravity: 2,
    gravpower: 1,
    looping: false,
    time_in_level: 0,
    tilemap: [[], []],
    levels: [
        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],

            ],
            width: 13,
            height: 15,
            tekst: ["press a and d to move, reach the flag to win"]

        },
        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],

            ],
            width: 13,
            height: 15,
            tekst: ["spikes send you back to the beginning,",
                "you can jump by pressing w or spacebar"
            ],

        },
        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 1, 1, 0, 0, 0, 0, 5, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,],
                [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],

            ],
            width: 13,
            height: 15,
            coin_claimed:false,

        },
        {
            tiles: [
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],

            ],
            width: 13,
            height: 15,
            tekst: ["try pressing e"],
            sys_break: () => {
                game.gravpower *= -1
            }

        },
        {
            tiles: [
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],

            ],
            width: 13,
            height: 15,
            tekst: ["isn't gravity manipulation cool,", "i think so"],
            sys_break: () => {
                game.gravpower *= -1
            }


        },
        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 1, 5, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],

            ],
            width: 13,
            height: 15,
            tekst: ["wait how the hell is that possible"],
            sys_break: () => {
                player.intangable = !player.intangable
                if (!player.intangable && player.collidesWithLevel(player.x, player.y)) {
                    player.set_at_start()
                }
            }
        },
        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 1, 4, 4, 4, 0, 3, 0,],
                [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0,],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [2, 0, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],

            ],
            width: 13,
            height: 15,
            tekst: [" i heard ya like ladders"],
            sys_break: () => {
                player.intangable = !player.intangable
                if (!player.intangable && player.collidesWithLevel(player.x, player.y)) {
                    player.set_at_start()
                }
            }
        },
        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 4, 4, 4, 0, 1, 1, 1, 0, 0,],
                [0, 0, 0, 0, 1, 1, 1, 0, 4, 3, 4, 0, 0,],
                [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 4, 1, 0, 0, 0, 0, 2, 0, 0, 0,],
                [0, 0, 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],

            ],
            width: 13,
            height: 15,
            tekst: ["i hope you used s key", "during the previus level"],
            sys_break: () => {
                player.intangable = !player.intangable
                if (!player.intangable && player.collidesWithLevel(player.x, player.y)) {
                    player.set_at_start()
                }
            }
        },

        {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4,],

            ],
            width: 13,
            height: 15,
            tekst: ["new power now bozo", "after pressing e try clicking your spawn point"],
            disabled: false,
            sys_break: () => {
                c.style.cursor = "pointer"
                game.levels[game.current_level].disabled = true
                c.addEventListener("click", () => {
                    const click = game.get_clicked_tile()
                    c.style.cursor = "auto"
                    game.levels[game.current_level].disabled = false
                    if (game.tilemap[click.y]?.[click.x] != null) {
                        game.tilemap[click.y][click.x] += 1
                        if (game.tilemap[click.y][click.x] >= 5) {
                            game.tilemap[click.y][click.x] = 0
                        }
                    }

                }, { once: true })
            }
        },
         {
            tiles: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,],

            ],
            width: 13,
            height: 15,
            tekst: ["air > block > spawn points > flags > air","now try and reach your spawn again"],
            disabled: false,
            sys_break: () => {
                c.style.cursor = "pointer"
                game.levels[game.current_level].disabled = true
                c.addEventListener("click", () => {
                    const click = game.get_clicked_tile()
                    c.style.cursor = "auto"
                    game.levels[game.current_level].disabled = false
                    if (game.tilemap[click.y]?.[click.x] != null) {
                        game.tilemap[click.y][click.x] += 1
                        if (game.tilemap[click.y][click.x] >= 5) {
                            game.tilemap[click.y][click.x] = 0
                        }
                    }

                }, { once: true })
            }
        },

    ],

    get_clicked_tile: function () {
        const level = game.levels[game.current_level]

        const TILE_W = size[0] / level.width
        const TILE_H = size[1] / level.height

        let x = Math.floor(this.mx / TILE_W)
        let y = Math.floor(this.my / TILE_H)

        return {
            x,
            y,
            value: game.tilemap[y]?.[x]
        }
    },
    start_level: function (level_index = 0) {
        this.current_level = level_index
        startile = this.get_playerstart()
        player.set_at_start()
        this.looping = true
        this.time_in_level = 0
        
        this.tilemap = structuredClone(this.levels[this.current_level].tiles)
        run_frame()
    },
    get_playerstart: function () {
        let res = { y: 0, x: 0 }
        this.levels[this.current_level].tiles.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === 2) {
                    res = { y: y, x: x }
                }

            })
        })
        return res
    },
    pick_level: async function () {
        return new Promise(resolve => {
            let x = 40
            let y = 20
            let hitboxes = []
            for (let index = 0; index < game.levels.length; index++) {
                const level = game.levels[index];
                ctx.strokeStyle = this.levels_cleared >= index ? "#000000" : "#9e9e9e"
                ctx.strokeRect(x, y, size[0] * 0.15, 100)
                ctx.fillStyle = this.levels_cleared > index ? "#00ff626f" : "#ffffff"
                ctx.fillRect(x, y, size[0] * 0.15, 100)
                ctx.font = "48px Arial"
                ctx.fillStyle = "black"
                ctx.fillText(index + 1, x + size[0] * 0.06, y + 65)

                if (this.levels_cleared >= index) hitboxes.push({ x: x, y: y, w: size[0] * 0.15, h: 100, i: index })

                x += size[0] * 0.2
                if (x > size[0]) {
                    x = 40
                    y += size[1] * 0.05 + 100
                }

            }

            c.addEventListener("click", () => {
                hitboxes.forEach(element => {
                    if ((game.mx > element.x && game.mx < element.x + element.w && game.my > element.y && game.my < element.y + element.h)) {
                        resolve(element.i)
                    }
                });

            })
        })

    },
    level_select: async function () {
        ctx.clearRect(0, 0, size[0], size[1])
        player.vx = 0
        player.vy = 0
        this.gravpower = 1
        player.intangable = false
        let level = await this.pick_level()
        this.start_level(level)
    }
}

stored_levels = localStorage.getItem("levels")
if (stored_levels) {
    stored_levels = JSON.parse(stored_levels)
}
else {
    stored_levels = 0
    localStorage.setItem("levels", JSON.stringify(0))
}
game.levels_cleared = stored_levels
const size = [1000, 600]
c.width = size[0]
c.height = size[1]

let startile = { y: 0, x: 0 }

let player = {
    x: 100,
    y: 60,
    // speed: movement_speed,
    vx: 0,
    vy: -5,
    friction: 0.7, // closer to 1 = more slipp
    air_firction: 0.85,
    acceleration: 5,
    maxSpeed: 8,
    size: 30,
    jump_height: 25,
    jump_cooldown: 25,
    max_kyotime: 5,
    kyotime: 0,
    since_jump: 0,
    grounded: false,
    color: "#3654fe",
    intang_color: "#3654fe71",
    retrying: 0,
    retry_max: 50,
    retryed: false,
    break_cooldown: 0,
    max_break_c: 20,
    intangable: false,
    mkeys: {
        "w": false,
        "a": false,
        "s": false,
        "d": false,
        " ": false,
        "r": false,
        "e": false,
    },
    getangle: function () {
        let radians = Math.atan2(this.vy, this.vx);
        let degrees = radians * (180 / Math.PI)
        return { radians: radians, degrees: degrees }
    },
    draw: function () {
        ctx.fillStyle = player.intangable ? player.intang_color : player.color
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        let r = { x: player.x + player.size - 15, y: player.y - 30 }
        let restart = ctx.createConicGradient(0, r.x, r.y)
        restart.addColorStop(0, "#00000050")
        restart.addColorStop(player.retrying / player.retry_max, "#00000050")
        restart.addColorStop(player.retrying / player.retry_max, "#00000000")
        restart.addColorStop(1, "#00000000")
        ctx.fillStyle = restart
        ctx.beginPath()
        ctx.arc(r.x, r.y, 10, 0, Math.PI * 2)
        ctx.fill()
    },
    collidesWithLevel: function (testX, testY) {
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
    },
    set_at_start: function () {
        game.gravpower = 1
        player.intangable = false
        player.break_cooldown = 30
        const level = game.levels[game.current_level]

        const block_w = size[0] / level.width
        const block_h = size[1] / level.height

        player.x = startile.x * block_w + block_w / 2
        player.y = startile.y * block_h + block_h / 2
        game.tilemap = structuredClone(level.tiles)
        level.coin_claimed = false
    }
}

const spikeImg = new Image()
spikeImg.src = "./assets/spikes.png"

const flagimg = new Image()
flagimg.src = "./assets/flag.png"
const coinimg = new Image()
coinimg.src = "./assets/coin.png"

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
c.addEventListener("mousemove", (event) => {
    let bbox = c.getBoundingClientRect()
    game.mx = event.clientX - bbox.left
    game.my = event.clientY - bbox.top
    // console.log(game.mx ,game.my)
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
    return game.tilemap[tileY][tileX] === 1
}

function run_frame() {
    ctx.clearRect(0, 0, size[0], size[1]) // clear

    const level = game.levels[game.current_level]
    const block_w = size[0] / level.width
    const block_h = size[1] / level.height

    if (level.tekst && game.time_in_level < 200) {
        ctx.font = "48px Arial"
        ctx.fillStyle = "black"
        y = 100
        for (let index = 0; index < level.tekst.length; index++) {
            const element = level.tekst[index];
            ctx.fillText(element, 50, y)
            y += 50
        }

    }
    for (let y = 0; y < game.levels[game.current_level].height; y++) {
        for (let x = 0; x < game.levels[game.current_level].width; x++) {

            const tile = game.tilemap[y][x];

            if (tile === 1) {
                ctx.strokeStyle = "black"
                ctx.strokeRect(x * block_w, y * block_h, block_w, block_h);
            } else if (tile == 2) {
                ctx.strokeStyle = "blue"
                ctx.beginPath()
                ctx.arc((x + 0.5) * block_w, (y + 0.5) * block_h, block_w * 0.2, 0, 2 * Math.PI)
                ctx.closePath()
                ctx.stroke()
            } else if (tile == 3) {
                ctx.drawImage(flagimg, block_w * x, block_h * y, block_w, block_h)
            } else if (tile == 4) {
                ctx.drawImage(spikeImg, block_w * x, block_h * y, block_w, block_h)
            }
            else if (tile == 5 && !level.coin_claimed){

                ctx.drawImage(coinimg, block_w * x+ block_w*0.2, block_h * y, block_w*0.6, block_h)
            }
        }
    }
    if (player.mkeys.a) {
        player.vx -= player.acceleration
    }
    if (player.mkeys.d) {
        player.vx += player.acceleration
    }
    if (player.mkeys.s && player.intangable) {
        player.y += 4
    }
    if (player.mkeys.w && player.intangable && player.collidesWithLevel(player.x, player.y)) {
        player.y -= 4
    }
    if (player.mkeys[" "] && (player.grounded || player.kyotime) && !player.since_jump) {
        player.vy -= player.jump_height * game.gravpower
        player.grounded = false
        player.since_jump = player.jump_cooldown
    }
    if (player.mkeys.r) {

        if (!player.retryed) {
            player.retrying++

            if (player.retrying >= player.retry_max) {

                player.set_at_start()

                player.vx = 0
                player.vy = -5

                player.retrying = 0
                player.retryed = true
            }
        }

    } else {

        player.retrying = 0

        // allow retry again only after release
        player.retryed = false
    }

    if (player.mkeys.e) {
        if (level.sys_break && !player.break_cooldown && !level.disabled) {
            level.sys_break()
            player.break_cooldown = player.max_break_c
        }
    }

    if (player.since_jump) player.since_jump--
    if (player.kyotime) player.kyotime--
    if (player.break_cooldown) player.break_cooldown--

    if (Math.abs(player.vx) > player.maxSpeed) {
        player.vx = player.maxSpeed * (player.vx / Math.abs(player.vx))
    }
    const nextX = player.x + player.vx

    const half = player.size / 2

    // keep inside horizontal map bounds
    if (
        nextX - half >= 0 &&
        nextX + half <= size[0]
    ) {

        // intangible ignores horizontal collisions
        if (!player.collidesWithLevel(nextX, player.y) || player.intangable) {
            player.x = nextX
        } else {
            player.vx = 0
        }

    } else {
        player.vx = 0
    }




    const nextY = player.y + player.vy



    if (player.intangable) {

        // only collide when falling onto ground
        if (player.vy * game.gravpower > 0) {

            if (!player.collidesWithLevel(player.x, nextY)) {

                player.y = nextY
                player.grounded = false

            } else {

                while (!player.collidesWithLevel(player.x, player.y + Math.sign(player.vy))) {
                    player.y += Math.sign(player.vy)
                }

                player.grounded = true
                player.vy = 0
            }

        } else {

            // moving upward while intangible
            player.y = nextY
        }

    } else {

        // normal collision logic
        if (!player.collidesWithLevel(player.x, nextY)) {

            player.y = nextY
            player.grounded = false

        } else {

            while (!player.collidesWithLevel(player.x, player.y + Math.sign(player.vy))) {
                player.y += Math.sign(player.vy)
            }

            if (player.vy * game.gravpower > 0) {
                player.grounded = true
            }

            player.vy = 0
        }
    }
    if (player.y - half < 0) {
        player.y = half
        player.vy = 0
    }

    if (player.y + half > size[1]) {
        player.y = size[1] - half
        player.vy = 0
    }
    if (player.grounded) {
        player.vx *= player.friction
        player.kyotime = player.max_kyotime
    } else {
        player.vx *= player.air_firction
    }

    player.vy += game.gravity * game.gravpower

    const tileX = Math.floor(player.x / block_w)
    const tileY = Math.floor(player.y / block_h)

    if (game.tilemap[tileY]?.[tileX] === 4) {
        player.set_at_start()
        player.vx = 0
        player.vy = -5
    }
    if (game.tilemap[tileY]?.[tileX] === 3 && !player.intangable) {
        game.looping = false
        if (game.current_level == game.levels_cleared) {
            game.levels_cleared++
            localStorage.setItem("levels", JSON.stringify(game.levels_cleared))
        }
    }
    if (game.tilemap[tileY]?.[tileX] === 5 && !player.intangable){
        level.coin_claimed = true
    }
    game.time_in_level++

    if (Math.abs(player.vx) < 0.0001) player.vx = 0
    player.draw()
    if (game.looping) {
        requestAnimationFrame(run_frame)
    } else {
        game.level_select()
    }

}

game.level_select()