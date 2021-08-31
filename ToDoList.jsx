import React ,{useState,useEffect} from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function ToDoList(){
    const[inputList,setInputList]=useState("");
    const[items,setItems]=useState([]);
    const[toggle,setToggle]=useState(true);
    const[idEditItem,setIdEditItem]=useState(null);

    function itemEvent(event){
        setInputList(event.target.value);
    };
    function listOfItem(){
           if(!inputList){
               alert("item is empty");
           }
           else if(inputList&&!toggle){
                   {
                    const update= items.filter((itemValue,ind) =>{
                        return !(idEditItem===ind);
                    });
                       items.map((element)=>{
                       if(element.ind===idEditItem){
                           setInputList(inputList);
                       }
                       setItems(update);
                       setItems([inputList,...update]);
                       })
                   }  
                   
               setToggle(true);
               setInputList("");
               setIdEditItem(null);
           }
           else{
               setItems([...items,inputList]);
               setInputList("");
           }
            
    }
    function deleteItem(id){
             const update= items.filter((itemValue,ind) =>{
                    return !(id===ind);
              });
              setItems(update); 
    }
   function editItem(id){
              console.log(id);
              items.find((ele,ind)=>{
                  if(ind===id){
                      setToggle(false);
                      setInputList(ele);
                      setIdEditItem(ind);
                  }
              });
    }
    /* set and get from localStorage*/ 
    useEffect(()=>{
        const json=localStorage.getItem("items");
        const save=JSON.parse(json);
        if(save){
            setItems(save);
        }
    },[]);
    useEffect(()=>{
        const json=JSON.stringify(items);
        localStorage.setItem("items",json);
   },[items]);
    return(
        <>
          <div className="container-sm main">
              <div className="center">
                  <br/>
                  <h1 className="container-sm Heading">TO DO LIST</h1>
                  <br/>
                  <div className="addItem">
                      <input type="text" value={inputList} placeholder="Add a item" onChange={itemEvent} />
                      {
                          toggle?(<Button onClick={listOfItem}><AddBoxIcon className="add"/></Button>):(<Button onClick={listOfItem}><EditIcon className="add"/></Button>)
                      }
                      
                      
                  </div>
                  <div className="showItem">
                      <div className="rowItem">
                          {
                              items.map((itemValue,ind)=>{
                              return(
                                  <div className="row" key={ind}>
                                      <h1>{itemValue}</h1>
                                      <div className="right">
                                             <span><Button onClick={()=>deleteItem(ind)}><DeleteIcon className="deleteIcon"/></Button></span> 
                                              <span><Button onClick={()=>editItem(ind)}><EditIcon/></Button></span>
                                      </div>
                                      
                                  </div>); 
                             })
                         };
                      </div>
                  </div>
                  <ul>
                      
                  </ul>
              </div>
          </div>
        </>
    );
};
export default ToDoList;