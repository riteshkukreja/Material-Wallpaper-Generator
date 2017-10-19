# Material-Wallpaper-Generator
Material Wallpaper Generator is a JavaScript Plugin to Build Material Wallpapers using SVG. Plugin requires 'saveSvgAsPng' js provided by exupero.

## Usage

```js
var materialWallpaperGenerator = new MaterialWallpaperGenerator([config]);
materialWallpaperGenerator.make();
```

The object can be configured with a Config Object.

## Config Object
### width
Width of the final Image. Default width is 2000px.

### height
Height of the final Image. Default height is 2000px.

### holder
The document element which would hold the final image element. Default is **document.body**

### bg
Takes a Hex Color code or RGB color code to fix the background color of the image. Default configuration selects a random color.
  
### colors
List of colors codes which restricts the colors used in the image. Default configuration takes all the colors.
  
### animation
Boolean value to animate creation of a new image. Adds a loader to the holder to be shown during image creation. Default is false.

### count
Number of objects to be added to the image. Default value is 1.

## Example

```js
var materialImageGenerator = new MaterialImageGenerator({
	width: window.innerWidth,
	height:window.innerHeight,
	holder:document.body.getElementById('board'),
	animation: true,
	count: 5
});
materialImageGenerator.make();
```
