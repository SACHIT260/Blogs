// import { useState,useEffect } from "react";


// const useFetch=(url)=>{
//     const [data,setData]=useState(null);
//     const [isPending,setIsPending]=useState(true);
//     const [error,setError]=useState(null);


//     useEffect(()=>{
//         const abortCont=new AbortController();

//         setTimeout(()=>{
//           fetch(url,{singnal:abortCont.signal})
//         .then(res=>{
//           if(!res.ok){
//             throw Error('could not fetch the data for that resource');
//           }
//           return res.json();
//         })
//         .then(data=>{
//           // console.log(data);
//           setData(data);
//           setIsPending(false);
//           setError(null);
//         })
//         .catch(err=>{
//           // console.log(err.message)
//           if(err==='AbortError'){
//             console.log('Fetch aborted');
//           }
//           else{
//           setIsPending(false);
//           setError(err.message);
//           }
//         })
//         },1000);
//         return ()=>abortCont.abort();
//       },[url]);

//       return {data,isPending,error}

// }

// export default useFetch;



import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setIsPending(false);
            } catch (err) {
                setError(err.message);
                setIsPending(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;
