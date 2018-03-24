$(document).ready(() => {
    console.log("THE DOC IS READY :)");
    drawing();
});

function drawing() {
    var myCanvas = document.getElementById("canvas");
    var ctx = myCanvas.getContext("2d");
    setProps(myCanvas, 800, 500);
    let dimensionProps = {
        left: myCanvas.offsetLeft,
        top: myCanvas.offsetTop
    };
    if (myCanvas) {
        let mouseisDown = false;
        let cPosX, cPosY;
        ctx.lineWidth = 5;
        $(myCanvas).mousedown((e) => {
            mouseisDown = true;
            cPosX = drawingPos(e.pageX, dimensionProps.left);
            cPosY = drawingPos(e.pageY, dimensionProps.top);
            ctx.beginPath();
            ctx.moveTo(cPosX, cPosY);
        }).mousemove((e) => {
            if (mouseisDown != false) {
                cPosX = drawingPos(e.pageX, dimensionProps.left);
                cPosY = drawingPos(e.pageY, dimensionProps.top);
                ctx.lineTo(cPosX, cPosY);
                ctx.strokeStyle = "black";
                ctx.stroke();
            }
        }).mouseup((e) => {
            mouseisDown = false;
            //ctx.closePath();
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

const drawingPos = (pPos, dProps) => ((pPos) - (dProps));