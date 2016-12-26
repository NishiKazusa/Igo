
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.width = canvas.W = window.innerWidth;
canvas.height = canvas.H = window.innerHeight;

window.addEventListener("click", function (e) {
    let mX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    let mY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    B.addStoneToArray(mX, mY);
    B.giveAttri();
    B.draw("#DCB35C", "black", "black");
    console.log(JSON.stringify(B.data));
});

function Igo() {
    if (canvas.H >= canvas.W) {
        canvas.l = canvas.W;
    } else {
        canvas.l = canvas.H;
    }
    function Ban(op) {
        this.data = [];
        this.dim = op.dim || 19;
        this.off = op.off || canvas.l / (this.dim + 1) * (2 / 3);
        this.size = op.size || canvas.l / (this.dim + 1);
        this.c = op.c;
        this.canvas = op.canvas;
        this.turn = op.turn || 0;
    }

    Ban.prototype.$clear = function () {
        this.c.clearRect(0, 0, this.canvas.W, this.canvas.H);
    }
    Ban.prototype.init = function () {
        let BA = this.data;
        for (let r = 0; r < this.dim - 1; r++) {
            BA.push([]);
            for (let c = 0; c < this.dim - 1; c++) {
                BA[r][c] = 0;
            }
        }
    }
    Ban.prototype.draw = function (bIro, lIro, hIro) {
        this.$clear();
        this.drawBG(bIro, lIro);
        this.drawHoshi(hIro);
        this.drawStones();
    }
    Ban.prototype.drawBG = function (bIro, lIro) {
        ctx.fillStyle = bIro;
        ctx.fillRect(0, 0, this.size * (this.dim - 1) + this.off * 2, this.size * (this.dim - 1) + this.off * 2);
        for (let r = 0; r < this.dim - 1; r++)
            for (let c = 0; c < this.dim - 1; c++) {
                c.fillStyle = lIro;
                ctx.lineWidth = 1;
                ctx.strokeRect((c * this.size) + this.off, (r * this.size) + this.off, this.size, this.size);
            }

    }
    Ban.prototype.drawHoshi = function (hIro) {
        let c = this.c;
        let close = 3;
        let far = 15;
        let mid = 9;
        c.fillStyle = hIro;
        c.beginPath();
        c.arc(close * this.size + this.off, close * this.size + this.off, this.size / 8, 0, 2 * Math.PI);
        c.fill();
        c.closePath();
        c.arc(close * this.size + this.off, far * this.size + this.off, this.size / 8, 0, 2 * Math.PI);
        c.fill();
        c.closePath();
        c.arc(far * this.size + this.off, close * this.size + this.off, this.size / 8, 0, 2 * Math.PI);
        c.fill();
        c.closePath();
        c.arc(far * this.size + this.off, far * this.size + this.off, this.size / 8, 0, 2 * Math.PI);
        c.fill();
        c.closePath();
        c.arc(mid * this.size + this.off, mid * this.size + this.off, this.size / 8, 0, 2 * Math.PI);
        c.fill();
        c.closePath();

    }
    Ban.prototype.drawStones = function () {
        let BA = this.data;
        let ct = this.c;
        for (let r = 0; r < BA.length; r++) {
            for (let c = 0; c < BA[0].length; c++) {
                let s = BA[r][c];
                if (s.color == 1) {
                    ct.fillStyle = "black";
                    ct.beginPath();
                    ct.arc(c * this.size + this.off, r * this.size + this.off, this.size / 2.7, 0, 2 * Math.PI);
                    ct.fill();
                    ct.closePath();
                } else if (s.color == 2) {
                    ct.fillStyle = "white";
                    ct.beginPath();
                    ct.arc(c * this.size + this.off, r * this.size + this.off, this.size / 2.7, 0, 2 * Math.PI);
                    ct.fill();
                    ct.closePath();
                }

            }
        }
    }
    Ban.prototype.addStoneToArray = function (mX, mY) {
        let bX, bY;

        let tX = Math.floor((mX - this.off) / this.size);
        if (tX + 1 * this.size - mX <= this.size / 2) {
            bX = tX + 1;
        } else {
            bX = tX;
        }

        let tY = Math.floor((mY - this.off) / this.size);
        if (tY + 1 * this.size - mY <= this.size / 2) {
            bY = tY + 1;
        } else {
            bY = tY;
        }
        bX -= 1;
        bY -= 1;
        if (this.data[bY][bX] == 0) {
            if (this.turn % 2 == 0) { //black
                this.data[bY][bX] = 1;
            } else { //white
                this.data[bY][bX] = 2;
            }
            this.turn++;
        }
    }

    function Ishi(op) {
        this.r = op.r;
        this.c = op.c;
        this.color = op.color;
        this.nSSS = op.nSSS;
        this.li = op.li;
    }

    Ban.prototype.giveAttri = function () {
        let BA = this.data;
        for (let r = 0; r < BA.length; r++) {
            for (let c = 0; c < BA[0].length; c++) {
                let p = BA[r][c];
                if (p != 0) {
                    BA[r][c] = new Ishi({
                            r: r,
                            c: c
                        }
                    );
                    if(typeof p == "number"){
                        BA[r][c].color = p;
                    }else if(typeof p == "object"){
                        BA[r][c].color = p.color;
                    }
                }
            }
        }
        for (let r = 0; r < BA.length; r++) {
            for (let c = 0; c < BA[0].length; c++) {
                let p = BA[r][c];
                if (p != 0) {


                    BA[r][c].setSSS(BA);
                    BA[r][c].setL(BA);
                }
            }
        }

    }

    Ishi.prototype.setSSS = function (BA) {
        let nSSS = 0;
        let y = this.r;
        let x = this.c;
        let u = BA[y - 1][x];
        let l = BA[y][x - 1];
        let r = BA[y][x + 1];
        let d = BA[y + 1][x];
        let SSA = [u, l, r, d];
        for (let i in SSA) {
            let s = SSA[i];
            if (typeof s == "object") {
                if (s.color == this.color) {
                    console.log("setSSS()");
                    nSSS++;
                }
            }

        }
        this.nSSS = nSSS;
    }

    Ishi.prototype.setL = function (BA) {
        let li = 0;
        let y = this.r;
        let x = this.c;
        let u = BA[y - 1][x];
        let l = BA[y][x - 1];
        let r = BA[y][x + 1];
        let d = BA[y + 1][x];
        let SSA = [u, l, r, d];
        for (let i in SSA) {
            let s = SSA[i];
            if (typeof s == "number") {
                console.log(s);
                if (s === 0) {
                    console.log("setL()");
                    li++;
                }
            }

        }
        this.li = li; //asdjfh
    }

// Ban.prototype.addGroups = function(){
//     let BA = this.data;
//
// }

//Groups of Stones
    let gB = [], gW = [];
//Gives global access
    Igo.Ban = Ban;
}

Igo();

//Create the new ban (19x19)
let B = new Igo.Ban({
    dim: 19,
    c: ctx,
    canvas: canvas
});
//Initialize Ban
B.init();
//Draw Ban BG
B.draw("#DCB35C", "black", "black");


