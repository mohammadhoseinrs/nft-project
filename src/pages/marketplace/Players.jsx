import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./../../assets/css/marketplace/players.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TopPlayers from "../../components/home/TopPlayers";
import Flag from "../../components/flag/main";
import Loading from "../../components/loading/Loading";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import {BiSearch} from 'react-icons/bi'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const override = css`
display: block;
margin: 0 auto;
border-color: white;
font-weight:bold;
 border:4px solid white;
`;
function valuetext(value) {
  return `${value}°C`;
}
export default function Players() {
  const [color, setColor] = useState("#525fe1");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumber2, setPageNumber2] = useState(1);

  const [dataPlayer, setDataPlayer] = useState([]);
  const [totalPage, setTotalPage] = useState('');
  const [totalPage2, setTotalPage2] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoading,setDataLoading]=useState(false)
  const [initilaize,setInitialize]=useState(false)
  const [playerTeam,setPlayerTeam]=useState([])
  const [checked, setChecked] = useState([true, false]);
  const [value, setValue] = React.useState([0, 100]);
  const [value2,setValue2]=useState()
  const [withoutFilter,setWithoutFilter]=useState(true)
  const handleChange = (event, newValue) => {
    console.log(newValue[0]);
    setValue(newValue);
  };
  console.log(value);

  useEffect(() => {
    setTotalPage2('')
    const fetchdata=async()=>{
    setLoading(true)
    api
      .get(`api/players/list?pageNumber=${1}&pageSize=10`)
      .then((res) => {
        setDataPlayer(res.data.data);
        setTotalPage(res.data.totalPages);
        setLoading(false);
        setInitialize(true)
      });
      api.get(`api/items/Players_Filter`).then(res=>{
        setPlayerTeam(res.data.playerTeam)
      })
    }
    fetchdata()
    
  }, []);
  useEffect(()=>{
    setTotalPage2('')
    setDataLoading(true)
     api
    .get(`api/players/list?pageNumber=${pageNumber}&pageSize=10`)
    .then((res) => {
      window.scrollTo(0, 0)
      setDataPlayer(res.data.data);
      setTotalPage(res.data.totalPages);
      setDataLoading(false)
    });
  
  },[pageNumber])

  const handleChange2 = (event) => {
    setValue2(event.target.value)
  };
  const filterHandler=async()=>{
    setTotalPage('')
    await api.get(`api/players/filter/${value2}/${value[0]}/${value[1]}?pageNumber=${pageNumber2}&pageSize=10`).then(res=>{
      console.log(res.data);
      window.scrollTo(0, 0)
      setDataPlayer(res.data.data);
      setTotalPage2(res.data.totalPages)
    })
  }
  useEffect(()=>{
    filterHandler()
  },[pageNumber2])

  
 
  function pageChangeHandler(event, pageNumber) {
    setPageNumber(pageNumber);
  }
  function pageChangeHandler2(event, pageNumber) {
    setPageNumber2(pageNumber);
  }
  
  if(dataLoading && initilaize) return (
    <div className="pagination__loading">
        <PropagateLoader color={color} loading={dataLoading} css={override} size={40} />
    </div>
  )
  if (loading) return <Loading />;
  return (
    <section className="players__container2">
      <div className="players__container__left">
        <div>
      <Accordion 
      sx={{
        color:'#fff',
        backgroundColor:'#05092B'
      }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon 
            sx={{
              color:'#fff',
            }}
            />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sort By</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={value2}
              onChange={handleChange2}
                >  
          {playerTeam?.map(team=>(
            <div className="players__container__left__inner__content">
              <div className="players__container__left__inner__content__item">          
                    <FormControlLabel value={team.id} control={<Radio sx={{
                      color:'#fff'
                    }} />} label={team.name} />
              </div>
            </div>
          ))}
             </RadioGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
      sx={{
        color:'#fff',
        backgroundColor:'#05092B'
      }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon 
            sx={{
              color:'#fff',
            }}
            />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="slider__showrange">
              <div className="slider__showrange__box">
                <input type="text" value={value[0]} />
                <span>Min</span>
              </div>
              <div className="slider__showrange__text">
                <span>To</span>
              </div>
              <div className="slider__showrange__box">
                <input type="text" value={value[1]} />
                <span>Max</span>
              </div>
            </div>
          <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    <Accordion
    sx={{
      color:'#fff',
      backgroundColor:'#05092B'
    }}
    >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon 
            sx={{
              color:'#fff',
            }}
             />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{
            color:'#fff',
          }}
        >
          <Typography>Collection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="accordian__search">
              <input type="text" placeholder="Search here" />
              <button>
                <BiSearch />
              </button>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
        <div className="filter__applying">
          <button onClick={filterHandler}>
          Apply Filter
          </button>
        </div>
      </div>
      <div className="players__container__right">
        <div className="players__container__right__top">
          {dataPlayer.map((item) => (
            <TopPlayers
              id={item.id}
              fullName={item.fullName}
              age={item.age}
              nationalityId1={Flag(item.nationalityId1)}
              nationalityId2={!Flag(item.nationalityId2) ? null : ""}
              styleId={item.styleId}
              leagueId={item.leagueId}
              themeId={item.themeId}
              position={item.position}
              locked={item.locked}
              price={item.price}
            />
          ))}
        </div>
        <div className="players__container__right__bottom">
          {totalPage && 
          <Stack  sx={{
            color:'#fff',
          }}
          spacing={2}>
            <Pagination
            sx={{
              '& .css-1pi9rcw-MuiButtonBase-root-MuiPaginationItem-root':{
                color:'#fff'
              },
              '& .css-1v2lvtn-MuiPaginationItem-root':{
                color:'#fff'
              }
            }}
              count={totalPage}
              shape="rounded"
              color="primary"
              page={pageNumber}
              onChange={(event, pageNumber) =>
                pageChangeHandler(event, pageNumber)
              }
            />
          </Stack>
          }

      {totalPage2 ?(
            <Stack  sx={{
            color:'#fff',
          }}
          spacing={2}>
            <Pagination
            sx={{
              '& .css-1pi9rcw-MuiButtonBase-root-MuiPaginationItem-root':{
                color:'#fff'
              },
              '& .css-1v2lvtn-MuiPaginationItem-root':{
                color:'#fff'
              }
            }}
              count={totalPage2}
              shape="rounded"
              color="primary"
              page={pageNumber2}
              onChange={(event, pageNumber) =>
                pageChangeHandler2(event, pageNumber)
              }
            />
          </Stack>
          ):('')}
        </div>
      </div>
    </section>
  );
}
