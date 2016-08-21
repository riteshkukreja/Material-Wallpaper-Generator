var MaterialImageGenerator = function(config) {

	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	var svgNS = svg.namespaceURI;
	var width = 2000;
	var height = 2000;
	var holder = document.body;
	var colors = [];
	var backgroundColor = '';
	var animation = false;
	var count = 1;

	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max-min)) + min;
	}

	var parallelLines = function() {
		var rect = document.createElementNS(svgNS,'rect');
		rect.setAttribute('x', -height);
		rect.setAttribute('y', getRandomInt(0, height));
		rect.setAttribute('width', 2*width);
		rect.setAttribute('height', getRandomInt(50, 400));

		var rotation = getRandomInt(-90, 90);

		rect.setAttribute('style', 'transform-origin: 0% 50%; transform: rotateZ(' + Math.floor(rotation) + 'deg); fill:' + randomColor());

		return rect;
	}

	var line = function() {
		var lines = document.createElementNS(svgNS, 'path');
		var d = 'M0 ' + getRandomInt(0, height) + ' L' + width + ' ' + getRandomInt(0, height) + ' L' +width + ' ' + height + ' L0 ' + height + ' Z';
		lines.setAttribute('d', d);
		lines.setAttribute('style', 'fill:' + randomColor());

		return lines;
	}

	var circles = function() {
		var circle = document.createElementNS(svgNS, 'circle');
		circle.setAttribute('cx', getRandomInt(0, width));
		circle.setAttribute('cy', getRandomInt(0, height));
		circle.setAttribute('r', getRandomInt(50, 500));

		circle.setAttribute('style', 'fill:' + randomColor());
		return circle;
	}

	var curveLines = function() {
		var lines = document.createElementNS(svgNS, 'path');
		var d = 'M0 ' + getRandomInt(0, height) + ' T' + width/2 + ' ' + getRandomInt(0, height) + ' ' + width + ' ' + getRandomInt(0, height) + ' L' +width + ' ' + height + ' L0 ' + height + ' Z';
		lines.setAttribute('d', d);
		lines.setAttribute('style', 'fill:' + randomColor());

		return lines;
	}

	var triangles = function() {
		var lines = document.createElementNS(svgNS, 'path');
		var d = 'M' + getRandomInt(0, width) + ' ' + getRandomInt(0, height) + ' L' + getRandomInt(0, width) + ' ' + getRandomInt(0, height) + ' L' + getRandomInt(0, width) + ' ' + getRandomInt(0, height) + ' Z';
		lines.setAttribute('d', d);
		lines.setAttribute('style', 'fill:' + randomColor());

		return lines;
	}

	var push = function(ele) {
		svg.appendChild(ele);
	}

	var randomColor = function() {
		if(colors.length == 0)
			return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		return colors[getRandomInt(0, colors.length)];
	}

	var Animation = function(width, height, color) {
		this.speed = 50;
		this.dom = null;
		this.width = width;
		this.height = height;
		this.color = color;

		var visible = true;

		this.build = function() {
			var div = document.createElement("div");

			div.style.borderRadius = "100%";
			div.style.background = this.color;
			div.style.transition = "all 200ms linear";
			div.style.position = "absolute";
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.transformOrigin = "50% 50%";
			div.style.transform = "scale(10)";
			div.style.zIndex = 100;

			this.dom = div;
		}

		this.show = function() {
			if(!visible) {
				divshow(this.dom);
			}
		}

		this.hide = function() {
			if(visible) {
				divhide(this.dom);
			}
		}

		var divhide = function(dom) {
			setTimeout(function() {
				dom.style.transform = "scale(0)";
			}, this.speed);

			visible = !visible;
		}

		var divshow = function(dom) {
			setTimeout(function() {
				dom.style.transform = "scale(10)";
			}, this.speed);

			visible = !visible;
		}
	}

	this.make = function() {
		if(animation)
			animator.show();

		if(backgroundColor.length == 0) {
			var baseColor = randomColor();
			while(baseColor > "#aaaaaa")
				baseColor = randomColor();

			build(baseColor);
		} else {
			build(backgroundColor);
		}

		svg.innerHTML = "";
		var time = getRandomInt(1, count+1);
		for(var i = 0; i < time; i++) {
			var op = ops[getRandomInt(0, ops.length)];
			push(op());
		}

		buildImage();
		
		if(animation)
			animator.hide();
	}

	this.makeFile = function () {
		var data = new Blob([holder.innerHTML], {type: 'image/svg+xml'});

	    // If we are replacing a previously generated file we need to
	    // manually revoke the object URL to avoid memory leaks.
	    if (SVGFile !== null) {
	    	window.URL.revokeObjectURL(SVGFile);
	    }

	    SVGFile = window.URL.createObjectURL(data);

	    // returns a URL you can use as a href
	    return SVGFile;
	}

	var buildImage = function() {
		//saveSvgAsPng(document.getElementById("board"), "pic.png");
		svgAsPngUri(svg, {}, function(uri) {
			var img = document.createElement("img");
			img.src = uri;
			holder.appendChild(img);
		});
	}


	var ops = [parallelLines, line, circles, curveLines, triangles];
	var SVGFile = null;


	// Handle configuration Object
	if(typeof config != "undefined") {
		// Width Configuration
		if(typeof config['width'] != "undefined" && isFinite(config['width']))
			width = config['width'];

		// Height Configuration
		if(typeof config['height'] != "undefined" && isFinite(config['height']))
			height = config['height'];

		// Holder Configuration
		if(typeof config['holder'] != "undefined")
			holder = config['holder'];

		// Background Color Configuration
		if(typeof config['bg'] != "undefined")
			backgroundColor = config['bg'];

		// Colors Configuration
		if(typeof config['colors'] == "object")
			colors = config['colors'];

		// Animation Configuration
		if(typeof config['animation'] != "undefined")
			animation = config['animation'];

		// Number of elements Configuration
		if(typeof config['count'] != "undefined")
			count = config['count'];
	}

	var animator = new Animation(width, height, randomColor());
	animator.build();

	var build = function(color) {
		svg.setAttribute('width', width);
		svg.setAttribute('height', height);
		svg.setAttribute('style', 'background:' + color);
		svg.setAttribute('id', "board");

		holder.innerHTML = "";
		holder.appendChild(animator.dom);
	}

}