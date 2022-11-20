import useWindowDimensions from "./windowdimension";


const Screen = ({ elements, isselected, issorted }) => {
    const { height, width } = useWindowDimensions();
    const checkstate = (index) => {
      if (issorted.indexOf(index) !== -1) {
        return "green";
      } else if (isselected.indexOf(index) !== -1) {
        return "blue";
      } else {
        return "black";
      }
    };
    const elementBar = elements.map((ele, index) => (
      <div
        className="bar"
        key={index}
        style={{
          width:`${Math.floor((width-(width*0.2))/elements.length)}px`,
          height: ele>10?`${ele % 1000}px`:"10px",
          //backgroundColor: isselected.indexOf(index) !== -1 ? "blue" : "black"
          backgroundColor: checkstate(index)
        }}
      >
       <p>{ele}</p>
      </div>
    ));
    return (
      <>
        <div className="screen">{elementBar}</div>
      </>
    );
  };
  export default Screen;
  