import React from "react";
import Slider from "react-slick";
import './carosel.css'
import configs from '../../constants/configs'

export default class SliderImages extends React.PureComponent {


  showImgs = imgs => {
    return imgs.map((img, index) => {
      return <div key={index}>
        <img  src={`${configs.url}${img.imageUrl}`} alt=""/>
      </div>
    })
  }

  render() {
    var settings = {
      dots: this.props.view  ? true : false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: this.props.view ? 'view' : 'ahihi',
      autoplaySpeed: 3000,
      autoplay: true,
      pauseOnDotsHover: true,

    };

    return (
      <Slider {...settings}  >
        {this.showImgs(this.props.images)}
      </Slider>
    );
  }
}