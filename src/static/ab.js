window.onload = function () {
    /*720代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;100代表换算比例，这里写100是
    为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等*/
    getRem(1920, 100)
};
window.onresize = function () {
    getRem(1920, 100)
    // var gao = document.body.clientHeight;
    // console.log(gao)
    var kuan = document.body.clientWidth;
    if (kuan < 969 && document.getElementById("rightFrom")) {
        document.getElementById("rightFrom").style.marginLeft = "-456px"
    }
    if (kuan < 1120 && document.getElementById("zuoxia") && document.getElementById("youshang")) {
        document.getElementById("zuoxia").style.display = "none"
        document.getElementById("youshang").style.display = "none"
    }
    if (969 < kuan && document.getElementById("rightFrom")) {
        document.getElementById("rightFrom").style.marginLeft = "0"
    }
    if (1120 < kuan && document.getElementById("zuoxia") && document.getElementById("youshang") && document.getElementById("rightFrom")) {
        document.getElementById("zuoxia").style.display = "block"
        document.getElementById("youshang").style.display = "block"
        document.getElementById("rightFrom").style.marginLeft = "0"
    }
};
function getRem(pwidth, prem) {
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth / pwidth * prem + "px";
}

