import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import Button from '@mui/material/Button';
import Header from './components/Header/Header.js';
import Container from '@mui/material/Container';
import Cards from "./components/Cards/Cards.js"
interface IDataItem {
  id: number;
  name: string;
}


function App() {
    const [readingPlan, setReadingPlan] = useState<string[]>([]);
    useEffect(() => {
        const fetchReadingPlan = async () => {
            try {
                const response = await axios.get<string[]>('http://localhost:8080/bible-plan'); // Assuming your Java backend is running on localhost:8080
                const data: string[] = response.data
                setReadingPlan(response.data)

            } catch (error) {
                console.error('Error fetching Bible reading plan:', error);
            }
        };

        fetchReadingPlan();
    }, []);



  return (
    <div className="App">
    <Container className="Main">
<Header/>

<div className="Bibleitems">
<Cards />
</div>
      </Container>
    </div>
  );
}

export default App;
