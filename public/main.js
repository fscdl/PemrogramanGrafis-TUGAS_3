var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

// cek apakah browser support atau tidak
if (!gl) {
    console.log('WebGL is not supported');
} else {
    console.log('WebGL is supported');
}

// setting warna canvas
gl.clearColor(0.988, 0.667, 0.99, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

var vertexShaderSource = `
    attribute vec2 a_position;
    void main(){
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

var fragmentShaderSource = `
    precision mediump float;

    void main() {
        gl_FragColor = vec4 (0.0, 0.0, 0.0, 1.0); // black color
    }
`;

// Membuat dan mengkompilasi vertex shader
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

// Membuat dan mengkompilasi fragment shader
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Membuat program shader
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Koordinat titik segitiga
var segitiga = [
    0.25 , 0.5,
    0.5 , 0.0,
    0.0 , 0.0,
];

// buat buffer segitiga
var triangleBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(segitiga), gl.STATIC_DRAW);

// ambil attribute location
var positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);

// memberikan data posisi segitiga ke atribut posisi
var size = 2;
var type = gl.FLOAT;
var normalize = false;
var stride = 0;
var offset = 0;
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

// gambar segitiga
var gambarSegitiga = gl.TRIANGLES;
var vertexCount = 3;
gl.drawArrays(gambarSegitiga, 0, vertexCount);

// Koordinat titik persegi
var persegi = [
    -0.2, -0.4,
    -0.2, -0.8,
    -0.8, -0.4,
    
    -0.2, -0.8,
    -0.8, -0.4,
    -0.8, -0.8
];

// Buat buffer persegi
var squareBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(persegi), gl.STATIC_DRAW);

// Atur pointer atribut posisi untuk persegi
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

// Gambar persegi
gl.drawArrays(gl.TRIANGLES, 0, 6); // 6 titik untuk persegi
