import { useState } from "react"
import { useEffect } from "react"
import "./product.css";
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";


const ProductPage = ()=>{
    const[data,setData] = useState([]);
    const [apiData,setApiData] = useState([]);
    const [count, setCount] = useState(1);
    useEffect(()=>{
        axios.get("https://dummyjson.com/products").then((res)=>{
            console.log(res);
            setApiData(res.data.products)
        })
    },[])
    useEffect(()=>{
        let temp = apiData.filter((item,i)=>{
            return i>=(count-1)*9 && i<count*9;
        });
        setData(temp)
    },[count,apiData]);

    const SearchHandler =(e)=>{
        let val = e.target.value;
        let temp = apiData.filter((item)=>{
            return item.category.includes(val);
        });
        setData(temp);
    }
    return(
        <div>
            <h1>Available Product</h1>
            <div><input type={"text"} placeholder="search by category" onChange={SearchHandler}/></div>
            <div className="products-div">
                {data.map((item)=>{
                    return(
                        <Popup key={item.id} trigger={
                            <div>
                          <img src={item.images[0]} alt="product-img"/>
                        </div>
                        } >
                           <div className="popup">
                              <div>
                                <img src={item.images[0]} alt="product-img"/>
                              </div>
                              <div>{item.description}</div>
                           </div>
                        </Popup>
                        
                    )
                })}
                
            </div>
            {data.length && 
            <div className="pagination">
                <button onClick={()=>{
                    if(count>1){
                        setCount(count-1)
                    }
                    
                    }}>Previous</button>
                <span>{count}</span>
                <button onClick={()=>{setCount(count+1)}}>Next</button>
            </div>}
        </div>
        
    )
}
export default ProductPage;