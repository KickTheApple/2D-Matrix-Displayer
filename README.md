2D Matrix Visualization Tool
A lightweight project for visualizing 2D matrices stored in a JSON file. This tool reads a JSON file with matrix data, allowing users to drag and drop the file onto the screen for quick visualization of the shapes stored within.

Features
-Drag-and-drop file support: Simply drag a JSON file onto the screen to visualize its 2D matrix data.
-JSON Parsing: Automatically reads the JSON file contents and processes matrix data.
-Shape Rendering: Visualizes shapes and patterns based on the matrix information in the JSON.

INSTALL:
``` git clone https://github.com/your-username/2D-Matrix-Displayer.git ```

USAGE:
1. Open the tool in your browser.
2. Drag and drop a JSON file containing a 2D matrix onto the screen.
3. The tool will render shapes based on the matrix data in real time.

JSON File Format
The JSON file should contain two main objects: **```models```** and **```scene```**.

models: This is an array of 2D shapes, where each shape is represented by a series of connected points. Each model contains line segments defined by pairs of coordinates.

scene: This array defines the transformations applied to the listed model in the scene. Each transformation includes scaling, rotation, and translation instructions to modify the models.

Example JSON Structure:

```
{
    "models": [
        [
            [[-1, -1], [1, -1]],
            [[1, -1], [0, 1]],
            [[0, 1], [-1, -1]]
        ],
        [
            [[0, 1], [-0.5878, -0.8090]],
            [[-0.5878, -0.8090], [0.9511, 0.3090]],
            [[0.9511, 0.3090], [-0.9511, 0.3090]],
            [[-0.9511, 0.3090], [0.5878, -0.8090]],
            [[0.5878, -0.8090], [0, 1]]
        ]
    ],
    "scene": [
        {
            "model": 0,
            "transforms": [
                { "type": "scale", "factor": [0.01, 0.01] },
                { "type": "rotate", "angle": 1 },
                { "type": "translate", "vector": [0.05, 0] },
                { "type": "rotate", "angle": 0.5 }
            ]
        },
        {
            "model": 1,
            "transforms": [
                { "type": "scale", "factor": [0.02, 0.02] },
                { "type": "rotate", "angle": 2 },
                { "type": "translate", "vector": [0.1, 0] },
                { "type": "rotate", "angle": 1 }
            ]
        }
        // Additional model transformations...
    ]
}
```
