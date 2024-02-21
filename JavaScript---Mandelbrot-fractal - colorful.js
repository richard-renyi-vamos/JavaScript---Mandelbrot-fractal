<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mandelbrot Fractal</title>
</head>
<body>
    <canvas id="mandelbrotCanvas" width="800" height="600"></canvas>
    <script>
        // Canvas setup
        const canvas = document.getElementById('mandelbrotCanvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const width = canvas.width;
        const height = canvas.height;

        // Mandelbrot settings
        const maxIterations = 100;
        const escapeRadius = 2;

        // Function to check if a point is in the Mandelbrot set
        function isInMandelbrotSet(x, y) {
            let real = x;
            let imag = y;
            for (let i = 0; i < maxIterations; i++) {
                const realTemp = real * real - imag * imag + x;
                const imagTemp = 2 * real * imag + y;
                real = realTemp;
                imag = imagTemp;
                if (real * real + imag * imag > escapeRadius * escapeRadius) {
                    return i;
                }
            }
            return maxIterations;
        }

        // Function to map value to rainbow color
        function rainbowColor(iteration) {
            const hue = (iteration % 360) / 360;
            const saturation = 1;
            const lightness = 0.5;
            const rgb = hslToRgb(hue, saturation, lightness);
            return rgbToHex(rgb[0], rgb[1], rgb[2]);
        }

        // Function to convert HSL to RGB
        function hslToRgb(h, s, l){
            let r, g, b;
            if(s === 0){
                r = g = b = l; // achromatic
            }else{
                const hue2rgb = (p, q, t) => {
                    if(t < 0) t += 1;
                    if(t > 1) t -= 1;
                    if(t < 1/6) return p + (q - p) * 6 * t;
                    if(t < 1/2) return q;
                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        // Function to convert RGB to HEX
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        // Draw Mandelbrot fractal
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const x = (i - width / 2) * 4 / width;
                const y = (j - height / 2) * 4 / height;
                const iteration = isInMandelbrotSet(x, y);
                const color = rainbowColor(iteration);
                ctx.fillStyle = color;
                ctx.fillRect(i, j, 1, 1);
            }
        }
    </script>
</body>
</html>
