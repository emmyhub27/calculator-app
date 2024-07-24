import { useState } from 'react'
import './App.css'

function App() {

  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");

  const valTrim = expression.trim();
  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };
  const click = (symbol) => {
      if(symbol === "clear"){
        setAnswer("");
        setExpression("0");
      }else if(isOperator(symbol)){
        setExpression(valTrim + " " + symbol + " ");
      }else if(symbol === "="){
        calculate();
      }else if(symbol === "0"){
        if(expression.charAt(0) !== "0"){
          setExpression(expression + symbol);
        }
      }else if(symbol === "."){
        const lastNumber = expression.split(/[-+/*]/g).pop();
        if(lastNumber?.includes(".")) return;
        setExpression(expression + symbol);
      }else{
        if(expression.charAt(0) === "0"){
          setExpression(expression.slice(1) + symbol);
        }else if(symbol === "delete"){
          setExpression(expression.slice(0, - 1));
          setAnswer("0");
        }else{
          setExpression(expression + symbol);
          
        }
      }
    };

const calculate = () => {
  if(isOperator(valTrim.charAt(valTrim.length - 1)))return;
  const parts = valTrim.split(" ");
  const newParts = [];
  for(let i = parts.length - 1; i >= 0; i--){
    if(["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])){
      newParts.unshift(parts[i]);

      let a = 0;
      let b = i - 1;
      while(isOperator(parts[b])){
        b--;
        a++;
      }
      i -= a;
    }else {
      newParts.unshift(parts[i]);
    }
  }
  const newExpression = newParts.join(" ");
  if(isOperator(newExpression.charAt(0))){
    setAnswer(eval(answer + newExpression));
  }else{
    setAnswer(eval(newExpression));
  }
  setExpression("");
};
  

  return (
    <div className="container">
      <div className="calculator">
        <form action="">
          <div className='display' id='display'>
            <div id='answer'>{answer}</div>
            <div id='expression'>{expression}</div>
            
          </div>
          <div>
            
            
            <input type="button" value="AC" id='clear'  onClick={() => click("clear")} className='gray'/>
            <input type="button" value="DE" id='delete' onClick={() => click("delete")} className='gray'/>
            <input type="button" value="/" id='divide' onClick={() => click("/")} className='gray'/>
            <input type="button" value="+" id='add' onClick={() => click("+")} className='orange'/>
          </div>
          <div>
            <input type="button" value="1" id='one' onClick={() => click("1")} />
            <input type="button" value="2" id='two' onClick={() => click("2")} />
            <input type="button" value="3" id='three' onClick={() => click("3")}/>
            <input type="button" value="-" id='subtract' onClick={() => click("-")} className='orange'/>
          </div>
          <div>
            <input type="button" value="4" id='four' onClick={() => click("4")}/>
            <input type="button" value="5" id='five' onClick={() => click("5")}/>
            <input type="button" value="6" id='six' onClick={() => click("6")}/>
            <input type="button" value="*" id='multiply' onClick={() => click("*")} className='orange'/>
          </div>
          <div>
            <input type="button" value="7" id='seven' onClick={() => click("7")}/>
            <input type="button" value="8" id='eight' onClick={() => click("8")}/>
            <input type="button" value="9" id='nine' onClick={() => click("9")}/>
            <input type="button" value="." id='decimal' onClick={() => click(".")} className='orange'/>
          </div>
          <div>
            <input type="button" value="0" id='zero' onClick={() => click("0")}/>
            <input type="button" value="00" id='double-zero' onClick={() => click("00")}/>
            <input type="button" value="=" id='equals' onClick={() => click("=")} className='red' />
            
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
