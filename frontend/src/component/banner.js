import React from 'react'
import images from '../icon/download.jpg'

export default function Banner() {
  // const [images, setImages] = useState([]);
  // const [imagesURLs, setImagesURLs] = useState([])

  // useEffect(() => {
  //   if (images.length < 1) return;
  //   const newImagesUrls = [];
  //   images.forEach((image) => newImagesUrls.push(URL.createObjectURL(image)))
  //   setImagesURLs(newImagesUrls);
  // }, [images]);

  // function onImageChange(e) {
  //   setImages([...e.target.files]);
  // }
  return (
    <div className='banner'>
      {/* <input type='file' multiple accept='image/*' onChange={onImageChange} />
      {imagesURLs.map((imageSrc, index) => (
        <img key={index} src={imageSrc} alt="" />
      ))} */}
          <img src={images} alt="" style={{ objectFit: 'cover',width: '100%', height: '19rem' }}/>
    </div>
  )
}
