import { useEffect, useState } from "react";
import {db} from "./firebase.js"
import {collection, getDoc, doc} from "firebase/firestore";


const StorageRef = () => {

    useEffect(() => {
        const getDocument = async () =>{
            const ref = doc(db, "admin_data","wrPrTTnWbFiKDTxGiRAy")
            const getSnapshot =  await getDoc(ref);
            console.log(getSnapshot.data())
        }
        getDocument()
    }, []);





    return (
        <></>
        // <div>
        //     {
        //         imgUrl.map(dataVal=> <div>
        //             <img src={dataVal} height="200px" width="200px" />
        //             <br/>
        //         </div>)
        //     }
        // </div>
    )
}

export default StorageRef;
