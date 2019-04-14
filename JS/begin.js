function select(){
    var radios = document.getElementsByName("radio");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked==true) {
        	return i;           
        }
    }    
    return -1;    	
}
function begin(){
	if(select()<0)
		alert("请先选择难度哦");
	else window.location.href="game.html?value="+select();
}