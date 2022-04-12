/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'whatwg-fetch';
import StarsContainer from '../../common/StarsContainer.jsx';


// -------------------STYLES------------------- //

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: end;
  align-items: center;
  border: solid;
  border-image: linear-gradient(45deg, rgb(207, 106, 48) , rgb(59, 167, 184));
  border-image-slice: 1;
  margin-right: 10px;
  margin-left: 10px;
  border-image-width: 2px;
  font-family:'Roboto',sans-serif;
`;

const ImageStyle = styled.img`
  height: 350px;
  max-width: 300px;
  min-width: 300px;
  object-fit: cover;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 300px;
  justify-content: space-between;
`;

const IconStyle = styled.i`
  /* position: absolute; */
  align-self: end;
  /* justify-content: end; */
  margin-right: 0.3em;
  /* font-size: 30px; */
`;

const CategoryStyle = styled.div`
  display: flex;
  padding-left: 5px;
  padding-top: 5px;
  align-self: start;
  font-family:'Roboto',sans-serif;
  font-weight: small;
`;

const NameStyle = styled.div`
  display: flex;
  align-self: center;
  font-family:'Roboto',sans-serif;
  font-weight: bold;
`;


// ------------------COMPONENT------------------ //

const OutfitCard = ({ outfit, deleteClick, currentItem }) => {
  const [style, setStyle] = useState([]);
  const [image, setImage] = useState('');

  const getStyle = () => {
    fetch(`${process.env.API_URI}/products/${outfit.id}/styles`, { method: 'GET', headers: { Authorization: process.env.API_KEY } })
      .then((response) => {
        response.json().then(result => {
          setStyle(result.results[0]);
          setImage(result.results[0].photos[0].thumbnail_url);
        })
      })
  }

  useEffect(() => {
    getStyle();
  }, [])

  return (
    <CardStyle>
      <ImageStyle src={image}></ImageStyle>
      <InnerDiv>
        <CategoryStyle className="outfit-category">{outfit.category.toUpperCase()}
        </CategoryStyle>
        <IconStyle onClick={() => deleteClick(outfit.id)}>&#10060;</IconStyle>
      </InnerDiv>
      <NameStyle className="outfit-name">{outfit.name}</NameStyle>
      { style.sale_price ? <div className="price">was ${style.original_price} now ${style.sale_price}</div> : <div className="price">${style.original_price}</div>}
      <StarsContainer currentItem={currentItem} starsAndReviews={false}/>
    </CardStyle>
  )
}

export default OutfitCard;