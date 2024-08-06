const bg = "#1F1A38";
const palette = [
    "#2c695a",
    "#4ad6af",
    "#7facc6",
    "#4e93cc",
    "#f6684f",
    "#ffd300"
];

let available = [];
const scl = 30;
let cols;
let rows;
let index = 0;

function setup() {
    createCanvas(600, 600);

    cols = floor((width - (width / 4)) / scl);
    rows = floor((height - (height / 4)) / scl);

    const rw = (scl + width) - (cols * scl);
    const rh = (scl + height) - (rows * scl);

    console.log(rw, rh)

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            if (random() > 0.3) {
                available.push({ x: (x * scl) + (rw / 2), y: (y * scl) + (rh / 2) });
            }
        }
    }

    available = shuffle(available);

    background(bg);
}

function draw() {
    const { x, y } = available[index];

    const value = random();
    setColor();
    if (value < 0.05) {
        spiral(x, y);
    } else if (value < 0.9) {
        point(x, y);
    } else {
        lines(x, y);
    }

    index++;
    if (index === available.length) noLoop();
}

function spiral(x, y) {
    let radius = 0;
    let max = 300;
    beginShape();
    for (let i = 0; i < max; i += 0.5) {
        const angle = map(i, 0, max / 3, 0, TWO_PI);
        const ax = cos(angle) * radius;
        const ay = sin(angle) * radius;
        vertex(ax + x, ay + y);
        radius += 0.05;
    }
    endShape();
}

function lines(x, y, max = floor(random(2, 9)), points = []) {
    const directions = ["top", "bottom", "left", "right"];
    const value = random(directions);

    const pos = { x, y };

    if (value === "top") {
        pos.y -= scl;
    } else if (value === "bottom") {
        pos.y += scl;
    } else if (value === "left") {
        pos.x -= scl;
    } else if (value === "right") {
        pos.x += scl;
    }

    if (points.length === 0) {
        points.push({ x, y });
    }

    points.push(pos);

    if (points.length === max) {
        beginShape();
        for (const p of points) {
            vertex(p.x, p.y);
        }
        endShape();
    } else {
        lines(pos.x, pos.y, max, points);
    }
}

function setColor() {
    const col = random(palette);
    stroke(col);
    strokeWeight(5);
    noFill();
}
