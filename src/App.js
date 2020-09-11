import React,{ useState, useEffect} from 'react';
import './App.css';
import Alert from "./components/Alert";
import ExpenceForm from "./components/ExpenceForm";
import ExpenceList from "./components/ExpenceList";
import {v4 as uuidv4} from "uuid";


/**
 * USING REACT HOOKS 
 * storing our data onto the storage
 * 
 * hook
 * useEffect function that runs after each render it recieve a call back function 
 * ie - first paremeter - call back func (runs after render)
 * second peremeter - array - for letting react know when to run useEffect
 * react re-renders when the state has changed or props
 * 
 * 

 * LOCAL STORAGE 
 * for this we gona be using the local storage on hour browser to store all our data
 * and this means that we dont have to worry whenever we refresh our browser  that the items will be gone 
 * there are two methods we use as bellow
 * localStorage.getItem('Item name)
 * localStorage.getItem('Item name)
 *
const initialExpences = [
  {id: uuidv4(), charge: "rent", amount: 1200},
  {id: uuidv4(), charge: "Car", amount: 350},
  {id: uuidv4(), charge: "insurance", amount: 500},
] 
*/

const initialExpences = localStorage.getItem("expences") 
? JSON.parse(localStorage.getItem("expences")): [];

/**
 * Import useState() so we can use react hooks and this helps us to 
 * use state in the statless function
 * thid function retruns [] with two values
 * i) the actual value of the state
 * ii) fucntion for updates/control
 * iii)default value
 */

function App() {

// const results = useState(initialExpences)
// const expences = results[0]
// const setExpences = results[1]

//************************ STATE VALUES *************** */
//All expences, add expenses
const [expences, setExpences] = useState(initialExpences)

//all single expences
const [charge, setCharge] = useState("")

// single Amount
const  [amount, setAmount] = useState("")

//alert
const [alert, setAlert] = useState({show:false})

//edit
const [edit, setEdit] = useState(false)

//id
const [ id, setId] = useState(0)
//************************ useEFFECT *************** */

useEffect(() => {
  // console.log("we rendere");
  localStorage.setItem("expences", JSON.stringify(expences));
}, [expences]);

//************************ FUNCTIONALITY *************** */
const handleCharge = event => {
  setCharge(event.target.value)
}
const handleAmount = event => {
  setAmount(event.target.value)
}

const handleAlert = ({type, text}) => {
  setAlert({show:true, type, text}) 

  setTimeout(() => {
    setAlert({show:false})
  }, 3000)
}

const handleSubmit = event => {
  event.preventDefault()
  if(charge !== '' && amount > 0) {
    if(edit) {
      const tempExpence = expences.map(item => {
        return item.id ===  id ? {...item, charge, amount} : item;
      })
      setExpences(tempExpence);
      setEdit(false);
      handleAlert({type:'success', text: 'item edited'})

    }
    else{
      const singleExpense = {id: uuidv4(), charge, amount };
      setExpences([...expences, singleExpense]);
      handleAlert({type:'success', text: 'item added'})
    }
    setCharge("");
    setAmount("");
  } else {
    handleAlert({type: 'danger', text:`charge can't be empty value and amount has to be bigger than zero`})
  }
};

  //clear items
  const clearItems = () => {
    //console.log("cleared")
    //setexpences this case controls all the arrays so
    setExpences([])
    handleAlert({type: 'danger', text:"All items deleted"})

  }

  // handle delete
  const handleDelete = (id) => {
    // console.log(`deleted ${id}`)
    const filteredExpences = expences.filter(item => item.id !== id)
    setExpences(filteredExpences)
    handleAlert({type: 'danger', text:"item deleted"})

  }

  // handle edit
  const handleEdit = (id) => {
    // console.log(`edited ${id}`)
    const selectedItem = expences.find(item => item.id ===id)
    let {charge, amount} = selectedItem
      setCharge(charge);
      setAmount(amount);
      setEdit(true);
      setId(id);
   
  }
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} />}
  <Alert />
  <h1>Budget Calculator</h1>
  <main className="App">

  <ExpenceForm 
    charge={charge}
    amount={amount}
    handleAmount={handleAmount}
    handleCharge={handleCharge}
    handleSubmit={handleSubmit}
    edit={edit}
  />
  <ExpenceList 
    expences={expences}
    handleDelete={handleDelete}
    handleEdit={handleEdit}
    clearItems={clearItems}

  />
  
  </main>
  <h1>
    Total Expenditure : {"  "}
    <span className="total">
      $ {
        expences.reduce((accum, curent) => {
          return accum += parseInt(curent.amount)
        }, 0)
      }
    </span>
  </h1>
  </>
  );
}

export default App;
