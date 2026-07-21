WING CHUN: SIU NIM TAO WEBSITE

1. Add the animated model
   Place your GLB file in the models folder and name it:
   wing-chun.glb

2. Run the website
   Open this folder in Visual Studio Code and use the Live Server extension,
   or run this command from the folder:

   python -m http.server 8000

   Then open http://localhost:8000

3. Update the movements
   Open script.js and find the movements array near the top.
   Replace each estimated start time, movement name, and description with
   Bradley's final information. Times are written in seconds.

4. Current demo duration
   The prototype assumes a total animation time of approximately 1 minute 55 seconds.
   Once the model loads, the website automatically reads the real duration from the GLB.

5. Model controls
   - Click and drag to rotate
   - Scroll to zoom
   - Right-click and drag to pan
