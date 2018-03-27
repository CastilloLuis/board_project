$(document).ready(() => {
    console.log("THE DOC IS READY :)");
    drawing();
    connect();
});

var start = {};
var draw = {};
var close = {};
var myCanvas;
var ctx;
var dimensionProps;

function drawing() {
    myCanvas = document.getElementById("canvas");
    ctx = myCanvas.getContext("2d");
    setProps(myCanvas, 800, 500);
    dimensionProps = {
        left: myCanvas.offsetLeft,
        top: myCanvas.offsetTop
    };
    if (myCanvas) {
        let mouseisDown = false;
        var cPosX, cPosY;
        ctx.lineWidth = 5;
        $(myCanvas).mousedown((e) => {
            mouseisDown = true;
            start.x = e.pageX;
            start.y = e.pageY;
            console.log("start"+JSON.stringify(start))
            sendDraw(start);
            //startDraw(start.x,start.y)
        }).mousemove((e) => {
            if (mouseisDown) {
                draw.x = e.pageX;
                draw.y = e.pageY;
                console.log("drawing"+JSON.stringify(draw))
                sendDraw(draw);
                //drawingCanvas(draw.x,draw.y)
            }
        }).mouseup((e) => {
            mouseisDown = false;
        });
    }
    clear(ctx, myCanvas);
}

const setProps = (canvas, w, h) => {
    canvas.width = w;
    canvas.height = h;
}

const clear = (ctx, canvas) => {
    $("#clear-btn").click(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}

// cross-browser canvas coordinates
const drawingPos = (pPos, dProps) => ((pPos) - (dProps));