import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bannerAction } from "../../redux/actions/BannerAction";
import { Row, Col } from "react-bootstrap";
import "./Banner.scss";
import LazyLoad from "../../shared/LazyLoad";

const Banner = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { banner } = state.banner;
  console.log(banner);

  useEffect(() => {
    dispatch(bannerAction(banner.banner));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {banner?.banner?.map((element) => {
        return (
          <Row className="Banner__container" key={element.id}>
            <Col className="Banner__text" sm={3}>
              <div className="Banner__card Banner__front">
                <div className="Banner__blue"></div>
                <div className="Banner__yellow"></div>
                <div className="Banner__pink"></div>
                <div className="Banner__dots"></div>
                <div className="Banner__personal-intro">
                  <p>{element.title}</p>
                  <p>{element.description}</p>
                </div>
              </div>
            </Col>
            <Col className="Banner__imagen" sm={9}>
              <LazyLoad src={element.imagen} alt={element.title} />
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default Banner;
