import {useState} from "react";

function App() {
  const a = 5;
  let message;

  const [count, setCount] = useState(0);
  const students = ["Anne","Bob","Charlie"];

const[task, setTasks]=useState([]);
const[input, setInput]=useState("");

const addStask=()=>{
  if(input.trim()==="")return;
  setTasks([...task, input]);
  setInput("");
}

  const isLoggedIn = true;

  if(isLoggedIn)
    {
        message = "Welcome back!"

      }
      else
      {
        message = "Please log in."
      }

  return (
     <div className="App">
     <h1>hello, react</h1>
      <p>a is equal to {a}</p>
      <p>{message}</p>

      <h2>{a > 5 ? "return" : "Please login."}</h2>

      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}> Increase</button>
      <button onClick={() => setCount(count - 1)}> Decrease</button>
      <button onClick={() => setCount(0)}> Reset</button>

      <ul>
        {students.map((students, index)=>(
          <li key={index}>{students}</li>
        ))}
      </ul>
      
        </div>  
      );
       
      }

      export default App;
