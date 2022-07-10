import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./../../assets/css/marketplace/players.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TopPlayers from "../../components/home/TopPlayers";
import Flag from "../../components/flag/main";
import Loading from "../../components/loading/Loading";
import Filter from "../../components/marketplace/Filter";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import {BiSearch} from 'react-icons/bi'
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
  const [dataPlayer, setDataPlayer] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const [dataLoading,setDataLoading]=useState(false)
  const [initilaize,setInitialize]=useState(false)
  const [playerTeam,setPlayerTeam]=useState([])
  const [checked, setChecked] = useState([true, false]);
  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
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
    console.log(event.target.value);
    
  };
  function pageChangeHandler(event, pageNumber) {
    setPageNumber(pageNumber);
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
          {playerTeam?.map(team=>(
            <div className="players__container__left__inner__content">
              <div className="players__container__left__inner__content__item">
              <FormControlLabel
                 label={team.name}
                 control={<Checkbox value={team.name} onChange={handleChange2} />}
                />
              </div>
            </div>
          ))}
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
            {playerTeam?.map(team=>(
            <div className="players__container__left__inner__content">
              <div className="players__container__left__inner__content__item">
              <FormControlLabel
                 label={team.name}
                 control={<Checkbox value={team.name} onChange={handleChange2} />}
                />
              </div>
            </div>
          ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
        
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
            />
          ))}
        </div>
        <div className="players__container__right__bottom">
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
        </div>
      </div>
    </section>
  );
}
