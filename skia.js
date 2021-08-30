const ckLoaded = CanvasKitInit({
    locateFile: (file) => 'https://unpkg.com/canvaskit-wasm@0.19.0/bin/' + file
});

const loadFont = fetch('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf')
    .then(r => r.arrayBuffer());

Promise.all([ckLoaded, loadFont]).then(([CanvasKit, fontData]) => {
    const surface = CanvasKit.MakeCanvasSurface('foo');

    let fullPaint = new CanvasKit.Paint();
    fullPaint.setColor(CanvasKit.BLACK);
    fullPaint.setStyle(CanvasKit.PaintStyle.Stroke);
    fullPaint.setAntiAlias(true);

    let dottedPaint = new CanvasKit.Paint();
    dottedPaint.setColor(CanvasKit.BLACK);
    dottedPaint.setStyle(CanvasKit.PaintStyle.Stroke);
    dottedPaint.setPathEffect(CanvasKit.PathEffect.MakeDash([5,5], 0));


    let fontPaint = new CanvasKit.Paint();
    fontPaint.setStyle(CanvasKit.PaintStyle.Fill);
    fontPaint.setAntiAlias(true);

    let paraStyle = new CanvasKit.ParagraphStyle({
        textStyle: {
            color: CanvasKit.BLACK,
            fontFamilies: [fontData],
            fontSize: 15
        },
        textAlign: CanvasKit.TextAlign.Left
    });
    let fontMgr = CanvasKit.FontMgr.FromData([fontData]);


    let totalHeight = 1485;
    let totalWidth = 1050;

    let numberOfFolds = 16;
    let m = totalHeight * 0.062;

    let x1 = m;
    let x2 = (totalWidth / 2) - m;
    let x3 = (totalWidth / 2) + m;
    let x4 = totalWidth - m;

    let foldHeight = totalHeight / numberOfFolds;
    let foldWidth = (totalWidth / 2) - (2 * m);

    let textWidth = (30 / 210) * totalWidth;

    let page = CanvasKit.RRectXY(CanvasKit.LTRBRect(0, 0, totalWidth, totalHeight), 0, 0);

    function draw(canvas) {
        canvas.clear(CanvasKit.White);

        // draw page
        console.log("draw page");
        canvas.drawRRect(page, fullPaint);

        // draw vertical lines
        console.log("draw vertical lines");
        canvas.drawLine(x1, 0, x1, totalHeight, fullPaint);
        canvas.drawLine(x2, 0, x2, totalHeight, dottedPaint);
        canvas.drawLine(x3, 0, x3, totalHeight, fullPaint);
        canvas.drawLine(x4, 0, x4, totalHeight, dottedPaint);

        // draw horizontal fold lines
        console.log('draw horizontal lines');
        for (let i = 1; i < numberOfFolds; i++) {
            let y = i * foldHeight;
            canvas.drawLine(x1, y, x2, y, fullPaint);
            canvas.drawLine(x3, y, x4, y, dottedPaint);
        }

        // draw folds
        console.log('draw folds');
        for (let i = 0; i < numberOfFolds; i++) {
            let y1 = i * foldHeight;
            let y2 = y1 + foldHeight;
            canvas.drawLine(x1, y1, x2, y2, dottedPaint);
            canvas.drawLine(x3, y2, x4, y1, fullPaint);
        }

        // draw text areas
        console.log('draw texts');
        for (let i = 1; i < numberOfFolds-1; i++) {
            var y1 = i * foldHeight;
            var y2 = (i * foldHeight) + (foldHeight / 2);
            var y3 = (i + 1) * foldHeight;

            let yText1 = y1 + (y2 - y1) / 2;
            let yText2 = y2 + (y3 - y2) / 2;

            let xa = x2-textWidth;
            let xb = x4-textWidth;

            let builder = CanvasKit.ParagraphBuilder.Make(paraStyle, fontMgr);
            builder.addText('AAA TTT GGG CCC');
            let para = builder.build();
            para.layout(foldWidth);
            canvas.drawParagraph(para, xa+15, y1+15);
            canvas.drawParagraph(para, xb+15, y2+15);
        }
    }
    surface.drawOnce(draw);
});