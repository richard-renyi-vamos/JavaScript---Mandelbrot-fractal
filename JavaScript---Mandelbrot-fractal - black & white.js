<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mandelbrot Fractal</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        canvas {
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="mandelbrotCanvas"></canvas>

    <script>
        const canvas = document.getElementById('mandelbrotCanvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight;

        // Mandelbrot parameters
        const maxIterations = 100;
        const scale = 200;
        const offsetX = -0.7;
        const offsetY = 0.0;

        // Function to calculate Mandelbrot set
        function mandelbrot(x0, y0) {
            let x = 0;
            let y = 0;
            let iteration = 0;
            while (x * x + y * y < 4 && iteration < maxIterations) {
                const xTemp = x * x - y * y + x0;
                y = 2 * x * y + y0;
                x = xTemp;
                iteration++;
            }
            return iteration;
        }

        // Render Mandelbrot fractal
        function renderMandelbrot() {
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    const x0 = (i - width / 2) / scale + offsetX;
                    const y0 = (j - height / 2) / scale + offsetY;
                    const iteration = mandelbrot(x0, y0);
                    const color = iteration === maxIterations ? 0 : 255 - Math.log2(iteration) * 30;
                    ctx.fillStyle = `rgb(${color},${color},${color})`;
                    ctx.fillRect(i, j, 1, 1);
                }
            }
        }

        // Render the Mandelbrot set on load
        window.onload = function () {
            renderMandelbrot();
        };
    </script>
</body>
</html>
