import './App.css';
import Picture from './Picture';
import {useState, useEffect, useCallback} from 'react';
import data from './data';
import Alert from './Alert';

const App = () => {
  const [quantity, setQuantity] = useState(6);

  const dataQuantity = data.slice(0, quantity);

  const randomData = useCallback(() => {
    let i = dataQuantity.length - 1;
    for(; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = dataQuantity[i];
      dataQuantity[i] = dataQuantity[j];
      dataQuantity[j] = temp;
    }
    return dataQuantity;
  }, [dataQuantity])

  const [pictures, setPictures] = useState(randomData());
  const [score, setScore] = useState(0);
  const [failed, setFailed] = useState(0);
  const [alert, setAlert] = useState({show: false, type: '', msg: ''});

  useEffect(() => {
    setPictures(randomData());
  }, [quantity]);

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg});
  }; 

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
    const visible = pictures.filter((picture) =>{
      return picture.type === 'visible';
    });
    if(visible.length < 2) {
      setPictures(newPictures('id', id, 'visible'));
    }
  }

  useEffect(() => {
    const found = pictures.filter((picture) =>{
      return picture.type === 'found';
    });
    if(found.length === pictures.length) {
      showAlert(true, 'success', 'Game over!');
      const timeout = setTimeout(() => {
        setScore(0);
        setFailed(0);
        setPictures(randomData());
      }, 3000)
      return () => clearTimeout(timeout);
    }
    let images = pictures.filter((picture) =>{
      return picture.type === 'visible';
    });
    if(images.length === 2) {
      if(images[0].name === images[1].name) {
        showAlert(true, 'success', 'Matching pieces!');
        setScore(score + 1);
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
        showAlert(true, 'danger', 'Pieces don\'t match...SORRY!');
        const timeout = setTimeout(() => {
          setFailed(failed + 1);
          // const newPictures = pictures.map((picture) => {
          //   if(picture.type !== 'visible') {
          //     return picture;
          //   }else {
          //     return {...picture, type: 'invisible'};
          //   }
          // });
          // setPictures(newPictures);
          setPictures(newPictures('type', 'visible', 'invisible'));
        }, 2000)
        return () => clearTimeout(timeout);
      }
    }
  }, [pictures, newPictures, failed, score]);

  return (
    <section>
      <div className={`container-${quantity}`}>
        {pictures.map((picture, index) => {
          return <Picture 
                    key={index} 
                    picture={picture} 
                    clickOnPicture={clickOnPicture} 
                  />
        })}
      </div>
      <div className="footer">
        <div>
          <p>{`Score: ${score}`}</p>
          <p>{`Failed attempts: ${failed}`}</p>
        </div>
        <div className="alert-box">
          {alert.show && <Alert 
                            {...alert}
                            removeAlert={showAlert}
                            pictures={pictures}
                          />
          }
        </div>
        <form className="radio-buttons">
          <p>Please select picture amount:</p>
          <div className="buttons">
            <label htmlFor="six">6</label>
            <input type="radio" id="six" name="quantity" value="6" defaultChecked
                  onClick={(e) => setQuantity(e.target.value)} />
            <label htmlFor="twelve">12</label>
            <input type="radio" id="twelve" name="quantity" value="12" 
                  onClick={(e) => setQuantity(e.target.value)} />
          </div>
        </form>
      </div> 
    </section>
  );
}

export default App;
