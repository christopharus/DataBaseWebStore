function onComplete(a) { // When the code completes, do this
    console.log(a);
}

function getFive(whenDone) {
    var a;
    setTimeout(function () {
        a = 5;
        whenDone(a);
    }, 10);
}
getFive(onComplete);
