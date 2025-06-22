import "./index.css"
import Canvas from "../../Components/canvas"
import { useRef, useState } from "react"
const Roompage = ({user}) => {

    const canvasRef=useRef(null)
    const ctxRef=useRef(null)
    const[tool,settool]=useState("pencil")
    const[color,setcolor]=useState("black")
    const[elements, setelements]=useState([])
    const[history , setHistory] = useState([])
    const [access, setAccess] = useState("view") // "edit" or "view"
    // const isEditable = user?.host;

    const handleClearCanvas=()=>{
       const canvas = canvasRef.current;
       const ctx = canvas.getContext("2d")
       ctx.fillRect= 'white'
       ctxRef.current.clearRect( 0,0,canvasRef.current.width,canvasRef.current.height);
       setelements([])
    }

    const undo = ()=>{
        setHistory((prevHistory)=>[
            ...prevHistory,
            elements[elements.length-1],
        ])
        setelements((prevelements)=>
            prevelements.slice(0,prevelements.length-1)
        )
    }

    const redo = ()=>{
        setelements((prevelements)=>[
            ...prevelements,
            history[history.length-1],
        ])
        setHistory((prevHistory)=>
            prevHistory.slice(0,prevHistory.length-1)
        )
    }

  return (
    <>
     <div className="row">

        <h2 className="text-center py-2">White board sharing app <span className="text-black">(Online Users :0)</span></h2>

        <div className="mx-auto col-md-10 px-4 mb-10 d-flex align-items-center justify-content-center">

              {/* tools */}
            <div className=" d-flex col-md-3 justify-content-center gap-2">

                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="pencil">Pencil</label>
                    <input type="radio" id="pencil" name="tool" checked={tool =="pencil"} value="pencil" onChange={(e)=>settool(e.target.value)} />
                </div>

                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="line">Line</label>
                    <input type="radio" id="line" checked={tool=="line"} name="tool" value="line" onChange={(e)=>settool(e.target.value)} />
                </div>

                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="rect">Rectangle</label>
                    <input type="radio" id="rect" name="tool" checked={tool=="rect"} value="rect" onChange={(e)=>settool(e.target.value)} />
                </div>

            </div>

              {/* color picker */}
            <div className="  mx-auto col-md-3  d-flex align-items-center justify-content-center">
                <label htmlFor="color">Select color:</label>
                <input type="color" id="color" name="color" className="mt-1 ms-2" value={color}onChange={(e)=>setcolor(e.target.value)}/>
            </div>

              {/* undo-redo */}
            <div className="col-md-3 d-flex gap-2">
            <button 
              className="btn btn-sm btn-primary mt-1" 
              disabled={elements.length === 0}
              onClick={()=>undo()}
            >Undo</button>
            <button className="btn btn-sm btn-outline-primary mt-1" 
              disabled={history.length < 1}
              onClick={()=>redo()}
            >Redo</button>
           </div>

              {/* eraser */}
           <div className=" col-md-2">
            <button className="btn btn-sm btn-danger " onClick={handleClearCanvas}>Clear Canvas </button>
           </div>

           {/* access */}
           <div className="col-md-2">
            <select
              className="form-select-sm mt-1"
              value={access}
              onChange={(e) => setAccess(e.target.value)}
            >
              <option value="edit">Edit Access</option>
              <option value="view">View Access</option>
            </select>
          </div>

        </div>

        <div className="col-md-12  mt-2 mx-auto canvas-box">
            <Canvas 
            canvasRef={canvasRef} 
            ctxRef={ctxRef} 
            elements={elements} 
            setelements={setelements} 
            tool={tool}
            color={color}
            access={access}
            // isEditable={isEditable} 
            />
        </div>
         
     </div>

    </>
  )
}
export default Roompage