const ckLoaded = CanvasKitInit({
    locateFile: (file) => 'https://unpkg.com/canvaskit-wasm@0.19.0/bin/' + file
});

ckLoaded.then((CanvasKit) => {
    const surface = CanvasKit.MakeCanvasSurface('foo');

    let paint = new CanvasKit.Paint();
    paint.setColor(CanvasKit.Color4f(0, 0, 0, 1.0));
    paint.setStyle(CanvasKit.PaintStyle.Stroke);
    paint.setAntiAlias(true);

    let accentPaint = new CanvasKit.Paint();
    accentPaint.setColor(CanvasKit.Color4f(1.0, 0, 0, 1.0));
    accentPaint.setStyle(CanvasKit.PaintStyle.Stroke);
    accentPaint.setAntiAlias(true);

    let fontPaint = new CanvasKit.Paint();
    fontPaint.setStyle(CanvasKit.PaintStyle.Fill);
    fontPaint.setAntiAlias(true);


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

    let page = CanvasKit.RRectXY(CanvasKit.LTRBRect(0, 0, totalWidth, totalHeight), 0, 0);




    function draw(canvas) {
        canvas.clear(CanvasKit.White);

        // draw page
        console.log("draw page");
        canvas.drawRRect(page, paint);

        // draw vertical lines
        console.log("draw vertical lines");
        canvas.drawLine(x1, 0, x1, totalHeight, paint);
        canvas.drawLine(x2, 0, x2, totalHeight, paint);
        canvas.drawLine(x3, 0, x3, totalHeight, paint);
        canvas.drawLine(x4, 0, x4, totalHeight, paint);

        // draw horizontal fold lines
        console.log('draw horizontal lines');
        for (let i = 1; i < numberOfFolds; i++) {
            let y = i * foldHeight;
            canvas.drawLine(x1, y, x2, y, paint);
            canvas.drawLine(x3, y, x4, y, paint);
        }

        // draw folds
        console.log('draw folds');
        for (let i = 0; i < numberOfFolds; i++) {
            let y1 = i * foldHeight;
            let y2 = y1 + foldHeight;
            canvas.drawLine(x1, y1, x2, y2, paint);
            canvas.drawLine(x3, y2, x4, y1, paint);
        }

        // draw text areas
        console.log('draw texts');
        for (let i = 0; i < numberOfFolds; i++) {
            var y1 = i * foldHeight;
            var y2 = (i * foldHeight) + (foldHeight / 2);
            var y3 = (i + 1) * foldHeight;

            let yText1 = y1 + (y2 - y1) / 2;
            let yText2 = y2 + (y3 - y2) / 2;

            let xa = x1 + ((x2 - x1) / 2);
            let xb = x3 + ((x4 - x3) / 2);

            canvas.drawRRect(CanvasKit.RRectXY(CanvasKit.LTRBRect(xa, y1, x2, y2), 0, 0), accentPaint);
            canvas.drawRRect(CanvasKit.RRectXY(CanvasKit.LTRBRect(xb, y2, x4, y3), 0, 0), accentPaint);
        }
    }
    surface.drawOnce(draw);
});