import {useState, useEffect} from 'react';
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import image from "../../images/bible_fam.jpg"
import axios, { AxiosResponse } from 'axios';


const Cards = () => {
  const [readingPlan, setReadingPlan] = useState([]);
  const [details, setDetails] = useState([]);

useEffect(() => {
    const fetchReadingPlan = async () => {
        try {
            const response = await axios.get('http://localhost:8080/bible-plan'); 
            const data = response.data
            setReadingPlan(response.data)

        } catch (error) {
            console.error('Error fetching Bible reading plan:', error);
        }
    };

    fetchReadingPlan();
}, []);


useEffect(() => {
  // Function to fetch details for each word from the second API
  const fetchDetails = async () => {
    try {
      const promises = readingPlan.map(async (topic) => {
        const response = await fetch(`https://iq-bible.p.rapidapi.com/GetBibleReadingPlanByTopic?topic=${topic}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch details for ${topic}`);
        }
        const data = await response.json();
        return data; // Assuming data is the details for each word
      });
      const detailsData = await Promise.all(promises);
      setDetails(detailsData);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  if (readingPlan.length > 0) {
    fetchDetails();
  }
}, [readingPlan]);


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));





  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {readingPlan.map((item, index) => (
          <Grid item xs={12} sm={14} md={4}>
            <Item>     <Card sx={{ display: 'flex' }}>
                         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                           <CardContent sx={{ flex: '1 0 auto' }}>
                             <Typography component="div" variant="h5">
                         
          <li key={index}>
            {/* Render your data attributes here */}
            {item}
          </li>

                             </Typography>
                             <Typography variant="subtitle1" color="text.secondary" component="div">
                               
                               {details.map((item, index) => (
<p>
  {item.readingPlan.verseIds}
</p>
                               ))}
                             </Typography>
                           </CardContent>
                           <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                             <IconButton aria-label="previous">

                             </IconButton>
                             <IconButton aria-label="play/pause">

                             </IconButton>
                             <IconButton aria-label="next">

                             </IconButton>
                           </Box>
                         </Box>
                         <CardMedia

                           sx={{ width: 151 }}
                           image={image}
                           alt="Live from space album cover"
                         />
                       </Card>
</Item>
          </Grid>
          ))}
      </Grid>
    </Box>
  );
}
export default Cards