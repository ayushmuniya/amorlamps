var Socket;

function init() {
  Socket = new WebSocket('ws://' + window.location.hostname + ':81/');
	document.getElementById("myColorRange").value =128;
	
	updateColor();	
	
	

}

function sendBrightness() {
	console.log("sendBrightness");
	Socket.send("#" + document.getElementById("brightness").value);
}

function hsv2rgb(h,s,v) 
{ 
  h = (360/255)*h;
  s = s/255;
  v = v/255;
  
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;

}



function hexToRGB(h) {
	let r = 0,
		g = 0,
		b = 0;
	if(h.length == 4) {
		r = "0x" + h[1] + h[1];
		g = "0x" + h[2] + h[2];
		b = "0x" + h[3] + h[3];
	} else if(h.length == 7) {
		r = "0x" + h[1] + h[2];
		g = "0x" + h[3] + h[4];
		b = "0x" + h[5] + h[6];
	}
	return [r, g, b];
}

function RGBToHSL(rgb) {
	r = rgb[0];
	g = rgb[1];
	b = rgb[2];
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;
	if(delta == 0) {
		h = 0;
	} else if(cmax == r) {
		h = ((g - b) / delta) % 6;
	} else if(cmax == g) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}
	h = Math.round(h * 60);
	if(h < 0) {
		h += 360;
	}
	h /= 360;
	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	h = +(h * 255).toFixed(0);
	s = +(s * 255).toFixed(0);
	l = +(l * 255).toFixed(0);
	// return(""+h+s+l)
	return [h, s, l];
}

function hex2hsl(s) {
	return RGBToHSL(hexToRGB(s));
}

function sendHSL() {
	console.log("sendHSL");
	//Socket.send("#" + hex2hsl(document.getElementById("favcolor").value)[0]);
	
	console.log("sendHSL done");
	
	console.log("#" + hex2hsl(document.getElementById("colorcode").style.background)[0]);
	
	console.log(document.getElementById("colorcode").style.background);
	
	console.log(document.getElementById("myColorRange").value);
	console.log(document.getElementById("myColorRange2").value);
	console.log(document.getElementById("myColorRange3").value);
	
	let hsl2hsv = (h,s,l,v=s*Math.min(l,1-l)+l) => [h, v?2-2*l/v:0, v];
	
	var toS = hsl2hsv(document.getElementById("myColorRange").value,document.getElementById("myColorRange2").value*(1/100),document.getElementById("myColorRange3").value*(1/100));
	var toSf = "#h"+parseInt(parseInt(toS[0])*255/360)+"s"+parseInt(toS[1]*255)+"v"+parseInt(toS[2]*255);
	
	//#h255s255v255
	console.log( toSf );
	Socket.send(toSf);
}

function updateGrpId() {
	console.log("updateGrpId");
	var txt;
	var r = confirm("Press OK to change group id!  and wait for 2 minutes");
	if(r == true) {
		txt = "You pressed OK!";
		Socket.send("g" + document.getElementById("grpIdText").value);
	} else {
		txt = "You pressed Cancel!";
	}
	console.log(txt);
	console.log("updateGrpId done");
}

function updateOnTime() {
	console.log("sendHupdateOnTimeSL");
	var txt = document.getElementById("updateXminsText").value;
	alert("on time updated to " + txt + " minutes");
	Socket.send("u" + txt);
	console.log(txt);
	console.log("updateOnTime done");
}

function turnOffLamp() {
	console.log("turnOffLamp");
	Socket.send("Xoff");
}

function resetWifi() {
	console.log("resetWifi");
	var r = confirm("Press OK to Reset wifi !  and wait for 2 minutes");
	if(r == true) {
		txt = "You pressed OK!";
		Socket.send("WifiForget");
	} else {
		txt = "You pressed Cancel!";
	}
}

function discoLights() {
	console.log("discoLights");
	Socket.send("DiscoLights");
}

function updateColor(){
	var h = document.getElementById("myColorRange").value
	var s = document.getElementById("myColorRange2").value
	var v = document.getElementById("myColorRange3").value
	
	console.log(""+h+s+v);
	
	//document.getElementById("myColorRange2").style =  "{background-image :linear-gradient(90deg,hsl("+(h*360/255)+"deg,50%,50%),#FFFFFF);}";
	document.getElementById("myColorRange2").style.background =  "linear-gradient(90deg,hsl("+h+"deg,30%,50%),hsl("+h+"deg,100%,50%))";
	//document.getElementById("myColorRange3").style.background =  "linear-gradient(90deg,hsl("+h+"deg,0%,50%),hsl("+h+"deg,100%,50%))";
	
	document.getElementById("myColorRange3").style.background =  "linear-gradient(90deg,hsl("+h+"deg,"+s+"%,40%),hsl("+h+"deg,"+s+"%,70%),hsl("+h+"deg,"+s+"%,100%))";
	
	//document.getElementById("myColorRange2").style.background-image =  "linear-gradient(90deg,hsl("+(h*360/255)+"deg,50%,50%),#FFFFFF)";
	//document.getElementById("myColorRange3").style.background-image =  linear-gradient(90deg,hsl(h,50%,50%),#000000);
	
	//document.getElementById("colorcode").innerHTML = ""+h+s+v;

	//document.getElementById("colorcode").style.color = "hsl("+h*360/255+"deg,"+(s*100/255)+"%,"+(v*100/255)+"%)";
	
	document.getElementById("colorcode").style.background = "hsl("+h+"deg,"+(s)+"%,"+(v)+"%)";
	
	sendHSL();
}
