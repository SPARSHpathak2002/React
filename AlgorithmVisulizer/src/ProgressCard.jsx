const ProgressCard =({stats})=>{
    
    return(
        <div className="stats">
            <div className="indicators">
                <p><span style={{color:"blue",fontSize:"20px"}}>&#128998;</span>Selectd for comparision</p>
                <p><span style={{color:"green",fontSize:"20px"}}>&#129001;</span>Sorted Element/Array</p>
                <p><span style={{color:"black",fontSize:"20px"}}>&#11035;</span>Unsorted Element/Array</p>
            </div>
            <div className="analysis">
                <h5>Analysis</h5>
                <p>Number of Iterations : <b style={{color:"yellow"}}>{stats.iter}</b></p>
                <p>Number of Comparisions : <b style={{color:"yellow"}}>{stats.comp}</b></p>
                <p>Number of Swaps : <b style={{color:"yellow"}}>{stats.swap}</b></p>

            </div>
        </div>
    );
}
export default ProgressCard