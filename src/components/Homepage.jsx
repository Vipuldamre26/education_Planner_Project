import { useEffect, useState } from 'react';
import './homepage.css';

const Homepage = () => {

    let oldData = [];
    
    const [allItems, setItems] = useState(oldData);

    
    useEffect(() => {
        if(localStorage.getItem('newData') === null){
            localStorage.setItem('newData', JSON.stringify([]));
        }
        else{
            oldData = JSON.parse(localStorage.getItem('newData'));
        }

        setItems(oldData);

    }, [allItems])

    // const [text, setText] = useState('');
    // const [num, setNum] = useState(0);






    const addData = () => {
        let newText = document.querySelector('.inputText').value;
        let newNum = document.querySelector('.inputNum').value;

        const arr = [];

        if (allItems.length !== 0) {
            arr.push(...allItems);
        }

        const newData = {
            id: allItems.length===0 ? 1 : allItems.length + 1,
            text: newText,
            number: newNum
        }

        // console.log(oldData);

        arr.push(newData);

        var jsonData = JSON.stringify(arr);

        localStorage.setItem('newData', jsonData);
        console.log(JSON.parse(localStorage.getItem('newData')));

        setItems(arr);
        newText = '';
        newNum = '';
    }



    const addNumber = (key) => {
        console.log(key);
        console.log(Number(allItems[0].id));
        let array = [...allItems];
        let newArr = array.map((item) => {
            if(item.id === key){
                Number(item.number++);
            }
            return item;
        })
        console.log(newArr);

        setItems([...newArr]);
        localStorage.setItem('newData', JSON.stringify(newArr));

    }


    const subNumber = (key) => {
        console.log(key);
        let array = [...allItems];
        let newArr = array.map((item) => {
            if(item.id === key && item.number > 0){
                Number(item.number--);
            }
            return item;
        })
        console.log(newArr);

        setItems([...newArr]);
        localStorage.setItem('newData', JSON.stringify(newArr));
    }




    return (
        <div className='homepage'>
            <h1>Geekster Education Planner</h1>
            <div className='div1'>
                <input className='inputText' type='text'></input>
                <input className='inputNum' type='number'></input>
                <button onClick={addData}>Add</button>
            </div>
            <div className='items'>
                {
                    allItems.length !== 0 ? allItems.map((item) => {
                        return (
                            <div className='item' key={item.text}>
                                <span>{item.text} - </span>
                                <span>{item.number} hours </span>

                                <button onClick={() => addNumber(item.id)} className='add'>+</button>
                                <button onClick={() => subNumber(item.id)} className='sub'>-</button>
                            </div>
                        )
                    }) : []
                }
                   
                
            </div>

        </div>
    )
}


export default Homepage;