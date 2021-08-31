// Define some canvas constants
const canvasHeight = 1485;
const canvasWidth = 1050;
const totalHeight = 297;
const totalWidth = 210;
const numberOfFolds = 16;
const textAreaWidth = 30;
const marginWidth = 13;

// calculate some values
let margin = canvasWidth * marginWidth / totalWidth;

let x1 = margin;
let x2 = (canvasWidth / 2) - margin;
let x3 = (canvasWidth / 2) + margin;
let x4 = canvasWidth - margin;

let foldHeight = canvasHeight / numberOfFolds;
let foldWidth = (canvasWidth / 2) - (2 * margin);

let textWidth = canvasWidth * textAreaWidth / totalWidth;

// prepare some variables to fill in
let CanvasKit;
let paraStyle;
let fontMgr;
let fullPaint;
let dottedPaint;
let fontPaint;
let dnaCode;


// Init vars
const ckLoaded = CanvasKitInit({ locateFile: (file) => 'https://unpkg.com/canvaskit-wasm@0.19.0/bin/' + file });
const loadFont = fetch('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf').then(r => r.arrayBuffer());
Promise.all([ckLoaded, loadFont]).then(([canvasKit, fontData]) => {
    CanvasKit = canvasKit;

    paraStyle = new CanvasKit.ParagraphStyle({
        textStyle: {
            color: CanvasKit.BLACK,
            fontFamilies: [fontData],
            fontSize: 15
        },
        textAlign: CanvasKit.TextAlign.Center
    });
    fontMgr = CanvasKit.FontMgr.FromData([fontData]);

    fullPaint = new CanvasKit.Paint();
    fullPaint.setColor(CanvasKit.BLACK);
    fullPaint.setStyle(CanvasKit.PaintStyle.Stroke);
    fullPaint.setAntiAlias(true);

    dottedPaint = new CanvasKit.Paint();
    dottedPaint.setColor(CanvasKit.BLACK);
    dottedPaint.setStyle(CanvasKit.PaintStyle.Stroke);
    dottedPaint.setPathEffect(CanvasKit.PathEffect.MakeDash([5, 5], 0));


    fontPaint = new CanvasKit.Paint();
    fontPaint.setStyle(CanvasKit.PaintStyle.Fill);
    fontPaint.setAntiAlias(true);
});

function drawRect(canvas, x, y, w, h, paint) {
    canvas.drawRRect(CanvasKit.RRectXY(CanvasKit.LTRBRect(x, y, x + w, y + h), 0, 0), paint);
}

function drawVerticalLine(canvas, x, paint) {
    canvas.drawLine(x, 0, x, canvasHeight, paint);
}

function drawHorizontalLine(canvas, x1, x2, y, paint) {
    canvas.drawLine(x1, y, x2, y, paint);
}

function drawLine(canvas, x1, y1, x2, y2, paint) {
    canvas.drawLine(x1, y1, x2, y2, paint);
}

function drawText(canvas, x, y, text) {
    console.log('drawing text: ' + text);
    let builder = CanvasKit.ParagraphBuilder.Make(paraStyle, fontMgr);
    builder.addText(text);
    let para = builder.build();
    para.layout(textWidth);
    canvas.drawParagraph(para, x, y);
}

function drawOnCanvas(canvas) {
    canvas.clear(CanvasKit.White);

    // draw page
    console.log("draw page");
    drawRect(canvas, 0, 0, canvasWidth, canvasHeight, fullPaint);

    // draw vertical lines
    console.log("draw vertical lines");
    drawVerticalLine(canvas, x1, fullPaint);
    drawVerticalLine(canvas, x2, dottedPaint);
    drawVerticalLine(canvas, x3, fullPaint);
    drawVerticalLine(canvas, x4, dottedPaint);

    console.log('draw horizontal lines, diagonal folds and text');
    for (let i = 0; i < numberOfFolds; i++) {
        // draw horizontal fold lines
        drawHorizontalLine(canvas, x1, x2, i * foldHeight, fullPaint)
        drawHorizontalLine(canvas, x3, x4, i * foldHeight, dottedPaint);

        // draw diagonal folds
        drawLine(canvas, x1, i * foldHeight, x2, (i + 1) * foldHeight, dottedPaint);
        drawLine(canvas, x3, (i + 1) * foldHeight, x4, i * foldHeight, fullPaint);


        // no text on first or last fold!
        if (i == 0 || i == numberOfFolds - 1)
            continue;

        let c = dnaCode.length / (2*(numberOfFolds-2));
        let index1 = (i - 1) * c;
        let index2 = index1 + (dnaCode.length / 2);

        let text1 = dnaCode.slice(index1, index1 + c).join('');
        let text2 = dnaCode.slice(index2, index2 + c).join('');

        let xt1 = x2 - textWidth;
        let xt2 = x4 - textWidth;

        let yt1 = i * foldHeight + 15;
        let yt2 = (i * foldHeight) + foldHeight - 30;


        drawText(canvas, xt1, yt1, text1);
        drawText(canvas, xt2, yt2, text2);
    }
}


function draw(code) {
    dnaCode = code;
    let surface = CanvasKit.MakeCanvasSurface('pattern');
    surface.drawOnce(drawOnCanvas);
}