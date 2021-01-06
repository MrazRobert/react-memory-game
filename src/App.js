import './App.css';
import Picture from './Picture';
import {useState, useEffect, useCallback} from 'react';
import data from './data';

const randomData = () => {
  let i = data.length - 1;
  for(; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
  }
  return data;
}

const App = () => {

  const [pictures, setPictures] = useState(randomData());

  const newPictures = useCallback((property, value, type) => {
    return pictures.map((picture) => {
      if(picture[property] !== value) {
        return picture;
      }else {
        return {...picture, type: type};
      }
    });
  }, [pictures])

  const clickOnPicture = (id) => {
    // const newPictures = pictures.map((picture) => {
    //   if(picture.id !== id) {
    //     return picture;
    //   }else {
    //     return {...picture, type: 'visible'};
    //   }
    // });
    // setPictures(newPictures);
    setPictures(newPictures('id', id, 'visible'));
  }

  useEffect(() => {
    let images = pictures.filter((picture) =>{
      return picture.type === 'visible';
    });
    if(images.length === 2) {
      if(images[0].name === images[1].name) {
        alert('Matching pieces!');
        // const newPictures = pictures.map((picture) => {
        //   if(picture.type !== 'visible') {
        //     return picture;
        //   }else {
        //     return {...picture, type: 'found'};
        //   }
        // });
        // setPictures(newPictures);
        setPictures(newPictures('type', 'visible', 'found'));
      }else {
        alert('Pieces don\'t match...SORRY!');
        // const newPictures = pictures.map((picture) => {
        //   if(picture.type !== 'visible') {
        //     return picture;
        //   }else {
        //     return {...picture, type: 'invisible'};
        //   }
        // });
        // setPictures(newPictures);
        setPictures(newPictures('type', 'visible', 'invisible'));
      }
    }
  }, [pictures, newPictures]);

  return (
    <section className="container">
      {pictures.map((picture, index) => {
        return <Picture 
                  key={index} 
                  picture={picture} 
                  clickOnPicture={clickOnPicture} 
              />
      })}
    </section>
  );
}

export default App;
