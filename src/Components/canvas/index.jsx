import { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";
import "./index.css";
const roughGenerator = rough.generator();
const Canvas = (
  { 
  canvasRef, 
  ctxRef, 
  elements, 
  setelements, 
  tool, 
  color,
  // isEditable
}) => {
  const [IsDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth*2;
    canvas.height = window.innerHeight-150;

    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.linecap = "round";
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    if (elements.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    elements.forEach((element) => {
      if (element.type === "pencil") {
        roughCanvas.linearPath(element.path,
          {
              stroke:element.stroke,
              strokeWidth:3,
              roughness:0,
            }
        );
      } else if (element.type == "line") {
        roughCanvas.draw(
          roughGenerator.line(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke:element.stroke,
              strokeWidth:3,
              roughness:0,
            }
          )
        );
      } else if (element.type == "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke:element.stroke,
              strokeWidth:3,
              roughness:0,
            }
          )
        );
      }
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    // if (!isEditable) return;
    if (tool === "pencil") {
      setelements((prevelemnts) => [
        ...prevelemnts,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
          element: tool,
        },
      ]);
    } else if (tool === "line") {
      setelements((prevelemnts) => [
        ...prevelemnts,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
          element: tool,
        },
      ]);
    } else if (tool === "rect") {
      setelements((prevelemnts) => [
        ...prevelemnts,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
          element: tool,
        },
      ]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    // if (!isEditable || !IsDrawing) return;
    if (IsDrawing) {
      if (tool === "pencil") {
        const { path } = elements[elements.length - 1];
        const newpath = [...path, [offsetX, offsetY]];
        setelements((prevelemnts) =>
          prevelemnts.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                path: newpath,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool === "line") {
        setelements((prevelemnts) =>
          prevelemnts.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool === "rect") {
        setelements((prevelemnts) =>
          prevelemnts.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
    }
  };

  const handleMouseUp = (e) => {
    // if (!isEditable) return;
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);
    setIsDrawing(false);
  };

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="h-100 w-100 border border-dark border-3 overflow-hidden"
      >
        <canvas ref={canvasRef} />
      </div>
    </>
  );
};

export default Canvas;
