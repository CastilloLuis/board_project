    var ws;

    const sendData = (data) => ws.send(JSON.stringify(data));

    const closeWs = () => ws.close();

    function connect(username) {
        ws = new WebSocket("ws://" + location.host + "/Board_Project/chatsv/" + username);

        ws.onmessage = (e) => {
            var data = JSON.parse(e.data);
            console.log("this is what i received " + JSON.stringify(data));
            console.log("DATA SI SE DESCONECTO: " + data.hasconnected);
            if (data.popup) connectedUser(data);
            if (data.isjson) usersList(data);
            if (data.clear) clearDraw();
            // TO START DRAWING
            if (data.state == "move") {
                drawingCanvas(data.x, data.y);
            } else if (data.state == "down") {
                startDraw(data.x, data.y, data.color);
            } else {
                endDraw();
            }
        }

        ws.onopen = (e) => {
            console.log("SUCCESSFULLY CONNECTION");
        }

        ws.onclose = (e) => {
            if (ws.readyState === WebSocket.OPEN) {
                console.log("THE CONNECTION HAS FINISHED");
                ws.close();
            }
        }

        ws.onerror = (e) => {
            console.log("error al conectar");
        }
    }

    // DATA HANDLER
    const usersList = (data) => {
        var listdiv = document.getElementById("list-div");
        delete data["popup"];
        delete data["isjson"];
        delete data["username"];
        delete data["hasconnected"];
        listdiv.innerHTML = "";
        for (let params in data) {
            listdiv.innerHTML += `<p style='color: white; font-family: Arial;'> ✔️@ ${data[params]}</p>`;
        }
    }

    const connectedUser = (data) => {
        console.log("se conecto o no" + data.hasconnected);
        if (data.hasconnected) {
            toastr["success"](`@${data.username} is now available`);
        } else {
            toastr["error"](`@${data.username} left the room`);
        }
    }

    // CANVAS
    const startDraw = (x, y, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        cPosX = x - dimensionProps.left;
        cPosY = y - dimensionProps.top;
        ctx.moveTo(cPosX, cPosY);
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
