import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLectureList } from "../../../features/lecture/lectureSlice";

const LandingPage = () => {
  const dispatch = useDispatch();

  const lectureList = useSelector((state) => state.lecture.lectureList);
  const [query] = useSearchParams();
  const name = query.get("name");
  useEffect(() => {
    dispatch(
      getLectureList({
        name,
      })
    );
  }, [query]);

  return (
    <Container>
      <Row>
        {lectureList.length > 0 ? (
          lectureList.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {name === "" ? (
              <h2>등록된 강의가 없습니다!</h2>
            ) : (
              <h2>{name}과(와) 일치한 강의가 없습니다!</h2>
            )}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default LandingPage;
