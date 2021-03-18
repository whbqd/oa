
window.onresize = function () {
    var gao = document.body.clientHeight;
    console.log(gao)
    var kuan = document.body.clientWidth;
    console.log(kuan)
    if (kuan<1160){
        // document.getElementById("zuoxia").style.display = "none"
        // document.getElementById("youshang").style.display = "none"
        document.getElementById("letfPic").style.display = "none"
    }else
    {
        // document.getElementById("zuoxia").style.display = ""
        // document.getElementById("youshang").style.display = ""
        document.getElementById("letfPic").style.display = ""
    }
};
