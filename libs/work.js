onmessage = function (event) {
    //从1加到num
    var data = event.data;
    var m =  Math;
    postMessage(m.sqrt(m.pow((data.x1-data.x2),2)+m.pow((data.y1-data.y2),2)));
}