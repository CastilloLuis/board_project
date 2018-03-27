$(document).ready(() => {
    console.log("THE DOC IS READY :)");
    drawing();
    clear();
});

var start = {};
var draw = {};
var endpath = {};
var myCanvas;
var ctx;
var dimensionProps;
var mouseisDown;
var brushColor;

function drawing() {
    myCanvas = document.getElementById("canvas");
    ctx = myCanvas.getContext("2d");
    setProps(myCanvas, 800, 500);
    dimensionProps = {
        left: myCanvas.offsetLeft,
        top: myCanvas.offsetTop
    };
    if (myCanvas) {
        mouseisDown = false;
        var cPosX, cPosY;
        ctx.lineWidth = 5;
        $(myCanvas).mousedown((e) => {
            mouseisDown = true;
            start.x = e.pageX;
            start.y = e.pageY;
            start.state = "down";
            start.color = brushColor;
            console.log("start"+JSON.stringify(start))
            sendData(start);
        }).mousemove((e) => {
            if (mouseisDown) {
                draw.x = e.pageX;
                draw.y = e.pageY;
                draw.state = "move";
                console.log("drawing"+JSON.stringify(draw))
                sendData(draw);
            }
        }).mouseup((e) => {
            mouseisDown = false;
            endpath.state = "up";
            sendData(endpath);
        });
    }
    clear();
}

const setProps = (canvas, w, h) => {
    canvas.width = w;
    canvas.height = h;
}

const clear = (ctx, canvas) => {
    $("#clear-btn").click(() => {
        sendData({clear: true});
    });
}

// cross-browser canvas coordinates
const drawingPos = (pPos, dProps) => ((pPos) - (dProps));

// brush color
const colorPicker = () => (brushColor = $("#colorPicker").val());

// set username
const setUsername = (modal, user) => {
    modal.style.display = "none";
    connect(user);
}