# Intro to CAD: OnShape Masterclass

Welcome to the beginner CAD workshop. Today we are using OnShape, a cloud-based 3D modeling software, to design mechanical parts for 3D printing and laser cutting.

---

## Step 0: OnShape Setup and Interface
Before we model, we need to set up our workspace. OnShape runs entirely in your browser.

1. Go to onshape.com and log in or create an educational/free account.
2. Click **Create > Document** in the top left corner.
3. Name your document "Workshop Practice".

<div class="media-placeholder video">
  <p>🎥 <strong>Video Placeholder:</strong> Screen recording showing the login process, creating a new document, and a quick tour of the Top/Front/Right planes.</p>
</div>

---

## Step 1: Sketching Basics
Everything in CAD starts with a 2D sketch. 

1. Select the **Top Plane**.
2. Click the **Sketch** button (Shift + S).
3. Press **N** on your keyboard to view the plane normally (flat).
4. Use the Line or Rectangle tool to draw a shape.
5. Press **D** to use the Dimension tool and define your exact sizes. Black lines mean the sketch is fully constrained!

<div class="media-placeholder image">
  <p>🖼️ <strong>Image Placeholder:</strong> Screenshot of a fully constrained (black lines) 2D sketch with visible dimensions.</p>
</div>

<div class="media-placeholder video">
  <p>🎥 <strong>Video Placeholder:</strong> Short clip showing drawing a rectangle, snapping it to the origin, and typing in dimensions.</p>
</div>

---

## Step 2: Extruding and Extrude Cutting
Now we turn 2D into 3D by pulling the sketch into a solid block, or pushing it through a solid to remove material.

1. Finish your sketch (green checkmark).
2. Click **Extrude** (Shift + E).
3. Select your sketch profile.
4. **To Add:** Choose "New" or "Add", type a depth (e.g., 20mm), and hit the green check.
5. **To Cut:** Sketch a circle on top of your new block, click Extrude, choose **Remove**, and set it to "Through All".

<div class="media-placeholder video">
  <p>🎥 <strong>Video Placeholder:</strong> Screen recording of extruding a base block, drawing a circle on its top face, and doing an extrude cut through it.</p>
</div>

---

## Step 3: Linear and Circular Patterns
Don't model the same feature twice. Use patterns to duplicate geometry evenly.

* **Linear Pattern:** Duplicates features along a straight edge.
* **Circular Pattern:** Duplicates features around a central axis (like a cylinder edge).

Select your feature (e.g., the hole you just cut), select the Pattern tool from the top ribbon, pick your direction/axis, and enter the number of instances.

<div class="media-placeholder image">
  <p>🖼️ <strong>Image Placeholder:</strong> Screenshot of the Circular Pattern dialog box open, showing 6 holes spaced evenly around a center point.</p>
</div>

---

## Step 4: Exporting for Laser Cutting (DWG/DXF)
Laser cutters only read 2D vector paths. We can export any flat sketch or flat face directly to a laser-ready format.

1. Right-click directly on the flat face or the 2D sketch in the feature tree.
2. Select **Export as DXF/DWG**.
3. Choose **DXF** format and **Version 2018**.
4. Click Export to download your file.

<div class="media-placeholder image">
  <p>🖼️ <strong>Image Placeholder:</strong> Screenshot showing the right-click menu over a flat face with "Export as DXF/DWG" highlighted.</p>
</div>

---

## Step 5: Revolving
Instead of pulling a shape straight up (extruding), we can spin a 2D profile around a center line to make cylindrical objects like wheels, cups, or shafts.

1. Draw half of your object's profile on the Front Plane.
2. Draw a solid line down the middle to act as the axis.
3. Click the **Revolve** tool.
4. Select the face to revolve, then click the axis line.

<div class="media-placeholder video">
  <p>🎥 <strong>Video Placeholder:</strong> Screen recording showing a 2D half-profile of a cup being spun 360 degrees using the Revolve tool.</p>
</div>

---

## Step 6: Custom Sketch Planes
You aren't limited to the default Top/Front/Right planes. You can sketch anywhere.

1. **Face Sketching:** Click any flat face on your 3D model and click "Sketch" to draw directly on it.
2. **Offset Planes:** Click the **Plane** tool, select a face or existing plane, and type a distance (e.g., 50mm) to create a new floating plane in mid-air. 

<div class="media-placeholder image">
  <p>🖼️ <strong>Image Placeholder:</strong> Screenshot showing an offset plane floating above the main body, ready for a new sketch.</p>
</div>

---

## Step 7: Exporting for 3D Printing
To physically print your model, you need to export the entire 3D body.

1. In the bottom left, right-click on your Part (e.g., "Part 1").
2. Select **Export**.
3. Format: **STL** (standard) or **STEP** (modern standard).
4. Units: **Millimeter**.
5. Resolution: **Fine**.
6. Click Export.

Below is an interactive preview of what a finished, exported 3D model looks like.

<!-- Interactive 3D Model Placeholder -->
<model-viewer 
  src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" 
  alt="3D CAD model placeholder" 
  auto-rotate 
  camera-controls 
  shadow-intensity="1">
</model-viewer>