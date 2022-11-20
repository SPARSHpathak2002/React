import { useState, useEffect } from 'react'
import Screen from './Screen';
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css'
import ProgressCard from './ProgressCard';

const App = () => {

  const [element, setElement] = useState();
  const [disableopt, setDisableopt] = useState(false);
  const [disablerun,setDisablerun]=useState(false);
  const [array, setArray] = useState([]);
  const [algo,setAlgo]=useState();
  const [isselected, setIsselected] = useState([]);
  const [issorted, setIssorted] = useState(new Array());

  const [stats,setStats]=useState({
    iter:0,
    comp:0,
    swap:0
  })

  useEffect(() => {
    const interval = setInterval(() => { }, 1000);
    return () => clearInterval(interval);
  }, [array, isselected, issorted,stats]);

  useEffect(()=>{

  },[stats])

  const handleSubmit = () => {
    if (element > 0 && element<=100 && algo !==null) {
      setDisableopt(true);
      var arr = new Array();
      for (let i = 0; i < element; i++) {
        let num = Math.floor(Math.random() * 100);
        arr.push(num);
        setArray(arr);
      }
    } else {
      console.log("Select POSITIVE number");
    }
  };

const handlereset=()=>{
  window.location.reload();
}

const runAlgo = () => {
  setDisablerun(!disablerun)

  if (algo==="BS"){
    BubbleSort(array);
  }
  if (algo==="SS"){
    selectionSort(array);
  }
  if (algo==="IS"){
    insertionSort(array);
  }
  if (algo==="QS"){
    quickSort(array,0,array.length-1);
  }
  //selectionSort(array);
  //BubbleSort(array);
  //insertionSort(array);
};
console.log(array)
const BubbleSort = async (arr) => {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      setIsselected([j, j + 1]);
      setStats(stat=>({...stat,iter:stat.iter+1}));
      setStats(stat=>({...stat,comp:stat.comp+1}));
      if (arr[j] > arr[j + 1]) {
        setStats(stat=>({...stat,swap:stat.swap+1}));
        await new Promise((r) => setTimeout(r, 1000));
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    const n = arr.length - i - 1;
    console.log(n);
    issorted.push(n);
    setIssorted([...issorted, n]);
    console.log(issorted);
  }
};

const selectionSort = async (arr) => {
  var i, j, min_idx;

  for (i = 0; i < arr.length - 1; i++) {
    min_idx = i;
    for (j = i + 1; j < arr.length; j++) {
      await new Promise((r) => setTimeout(r, 1000));
      setIsselected([min_idx, j]);
      setStats(stat=>({...stat,iter:stat.iter+1}));
      setStats(stat=>({...stat,comp:stat.comp+1}));
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    await new Promise((r) => setTimeout(r, 1000));
    setIsselected([min_idx, i]);
    setStats(stat=>({...stat,swap:stat.swap+1}));
    var temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
    issorted.push(i);
    setIssorted([...issorted, i]);
  }

  issorted.push(i);
  setIssorted([...issorted, i]);
};

const insertionSort = async (arr) => {
  let i, key, j;
  issorted.push(0);
  setIssorted([...issorted, 0]);
  for (i = 1; i < arr.length; i++) {
    key = arr[i];
    j = i - 1;
    setStats(stat=>({...stat,iter:stat.iter+1}));
    while (j >= 0 && arr[j] > key) {
      setStats(stat=>({...stat,iter:stat.iter+1}));
      setStats(stat=>({...stat,comp:stat.comp+1}));
      setStats(stat=>({...stat,swap:stat.swap+1}));
      arr[j + 1] = arr[j];
      await new Promise((r) => setTimeout(r, 500));
      setIsselected([i, j]);
      j = j - 1;
      setIsselected([i, j]);
      await new Promise((r) => setTimeout(r, 500));
      //issorted.push(j);
      setIssorted([...issorted, j]);
    }
    setIsselected([i, j+1]);
    await new Promise((r) => setTimeout(r, 500));
    arr[j + 1] = key;
    issorted.push(i);
    setIssorted([...issorted, i]);
  }
  //issorted.push(j);
  setIssorted([...issorted, i+1]);
};

const swap=(arr, i, j)=>{
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const partition=(arr, low, high)=>{
  let pivot = arr[high];
  let i = (low - 1);
  for (let j = low; j <= high - 1; j++) {
      setStats(stat=>({...stat,iter:stat.iter+1}));
      setStats(stat=>({...stat,comp:stat.comp+1}));
      if (arr[j] < pivot) {
          i++;
          setStats(stat=>({...stat,swap:stat.swap+1}));
          swap(arr, i, j);
          
      }
  }
  setStats(stat=>({...stat,swap:stat.swap+1}));
  swap(arr, i + 1, high);
  return (i + 1);
}
const quickSort= async(arr, low, high)=>{
  if (low < high) {

      // pi is partitioning index, arr[p]
      // is now at right place 
      var pi = partition(arr, low, high);
      issorted.push(pi-1);
      await new Promise((r) => setTimeout(r, 500));
      setIssorted([...issorted, pi-1]);
      // Separately sort elements before
      // partition and after partition
      for(let i=low;i<pi-1;i++){
        await new Promise((r) => setTimeout(r, 500));
        setIsselected([i])
      }
      quickSort(arr, low, pi - 1);
      for(let i=pi+1;i<=high;i++){
        await new Promise((r) => setTimeout(r, 500));
        setIsselected([i])
      }
      quickSort(arr, pi + 1, high);
  }
  issorted.push(pi);
  await new Promise((r) => setTimeout(r, 500));
  setIssorted([...issorted, pi]);
  issorted.push(high);
  await new Promise((r) => setTimeout(r, 200));
  setIssorted([...issorted, high]);
}
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <h3>Algorithm Visulizer</h3>
          <Nav className="me-right">
            <Form.Control
              disabled={disableopt} 
              className='m-1' 
              type="number"
              value={element}
              onChange={(e) => setElement(e.target.value)} 
              placeholder="No of Elements" />

            <Form.Select
              disabled={disableopt} 
              className='m-1'
              aria-label="Default select example"
              onChange={(e)=>setAlgo(e.target.value)}
              >
              <option value={null}>Select Algorithm</option>
              <option value="BS">Bubble Sort</option>
              <option value="SS">Selection Sort</option>
              <option value="IS">Insertion Sort</option>
              <option value="QS">Quick Sort</option>
            </Form.Select>

            <Button className='m-1' disabled={disableopt} onClick={handleSubmit} variant="warning">SET</Button>
            <Button className='m-1' disabled={disablerun}onClick={runAlgo} variant="success">RUN</Button>
            <Button className='m-1' onClick={handlereset} variant="danger">RESET</Button>
          </Nav>
        </Container>
      </Navbar>
      {
        !disableopt?(
          <div className='wrapper'>
            <div className="instructions">
              <h3>Algorithm Visulizer</h3>
              <ul>
                <li>Steps to run :
                  <ol>
                    <li>Enter no of Elements (between 0 and 100)</li>
                    <li>Select sorting algorithm </li>
                    <li>click SET to fix this arrangement</li>
                    <li>click RUN</li>
                  </ol>
                </li>
                <li>Click RESET for stop/reset</li>
                <li>In any case of CRASH ,click RESET</li>
                
              </ul>
            </div>
            </div>
        ):(
          <>
          <ProgressCard stats={stats}/>
          <Screen elements={array} isselected={isselected} issorted={issorted} />
          </>
        )
      }
      <div className="footer">
        <div className='footer-left'>
          <h6>Made with <span style={{color:"red",fontSize:"28px"}}>&#9829;</span> by Sparsh Pathak</h6>
        </div>
        <div className='footer-right'>
          <a href="">github</a>
        </div>
      </div>
    </>
  )
}

export default App
