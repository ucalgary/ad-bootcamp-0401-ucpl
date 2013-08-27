function initCursor() {
	if (document.forms[0]) { // avoid JS errors
		if (document.forms[0].elements[0]) { // avoid JS errors
			i=0
			while (i < document.forms[0].elements.length && document.forms[0].elements[i].type=="hidden") i+=1;
			setTimeout("document.forms[0].elements[i].focus()",100)
		}
	}
}

var submitcount=0
function processForm() {
	submitcount++
	return (submitcount == 1)
}

var popUpWin=0;
function popUpWindow(URLStr, left, top, width, height)
{
  if(popUpWin)
  {
    if(!popUpWin.closed) popUpWin.close();
  }
  popUpWin = open(URLStr, 'UCPL', 'toolbar=no,location=yes,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=yes,width='+width+',height='+height+',left='+left+', top='+top+',screenX='+left+',screenY='+top+'');
}