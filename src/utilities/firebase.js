import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';


const firebaseConfig = {
    apiKey: "AIzaSyD6HTeD1nEE5dIOZKsrtYs7aumAoB3rakY",
    authDomain: "cs394-scheduler-f33fe.firebaseapp.com",
    databaseURL: "https://cs394-scheduler-f33fe-default-rtdb.firebaseio.com",
    projectId: "cs394-scheduler-f33fe",
    storageBucket: "cs394-scheduler-f33fe.appspot.com",
    messagingSenderId: "666150317232",
    appId: "1:666150317232:web:d45cfb64326b64862bdf75",
    measurementId: "G-CHZH7X2BB1"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};