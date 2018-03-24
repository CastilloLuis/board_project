$(document).ready(() => {
    console.log("THE DOC IS READY :)");
    drawing();
});
 
const drawing = () => {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    setProps(myCanvas, 800, 500);
    let dimensionProps = {left: myCanvas.offsetLeft, top: myCanvas.offsetTop};
    if (myCanvas) {
        let mouseisDown = false;
        let cPosX, cPosY;
        ctx.lineWidth = 5;
        $(myCanvas).mousedown((e) => {
            mouseisDown = true;
            ctx.beginPath();
            cPosX = e.pageX - dimensionProps.left;
            cPosY = e.pageY - dimensionProps.top;
            ctx.moveTo(cPosX, cPosY);
        }).mousemove((e) => {
            if (mouseisDown != false) {
                cPosX = e.pageX - dimensionProps.left;
                cPosY = e.pageY - dimensionProps.top;
                ctx.lineTo(cPosX, cPosY);
                ctx.strokeStyle = "black";
                ctx.stroke();
            }
        }).mouseup((e) => {
            mouseisDown = false;
            ctx.closePath();
        });
    }
    clear(ctx, myCanvas);
};

const setProps = (canvas, w, h) => {
    canvas.width = w;
    canvas.height = h;
}

const clear = (ctx, canvas) => {
    $("#clear-btn").click(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}