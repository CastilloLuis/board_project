    var ws;

    const sendDraw = (coord) => ws.send(JSON.stringify(coord));

    const close = () => ws.close;

    function connect() {
        ws = new WebSocket("ws://" + location.host + "/Board_Project/chatsv");

        ws.onmessage = (e) => {
            var mydraw = JSON.parse(e.data);
            console.log("this is what i received " + JSON.stringify(mydraw));
            //startDraw(mydraw.x,mydraw.y);
           // drawingCanvas(mydraw.x, mydraw.y);
            if (mydraw.state == "move") {
                drawingCanvas(mydraw.x, mydraw.y);
            } else {
                startDraw(mydraw.x, mydraw.y, mydraw.color);
            }
            //endDraw();
        }   

        ws.onopen = (e) => {
            console.log("SUCCESSFULLY CONNECTION");
        }

        ws.onclose = (e) => {
            if (ws.readyState === WebSocket.OPEN) {
                console.log("THE CONNECTION HAS FINISHED");
            }
        }

        ws.onerror = (e) => {
            console.log("error al conectar");
        }
    }

    const startDraw = (x, y, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        cPosX = x - dimensionProps.left;
        cPosY = y - dimensionProps.top;
        //ctx.moveTo(x,y); //it works
        ctx.moveTo(cPosX,cPosY);
    }

    const drawingCanvas = (x, y) => {
        cPosX = x - dimensionProps.left;
        cPosY = y - dimensionProps.top;
        ctx.lineTo(cPosX, cPosY);
        ctx.stroke();
    }

    const clearDraw = () => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    }

    const endDraw = () => ctx.closePath();
