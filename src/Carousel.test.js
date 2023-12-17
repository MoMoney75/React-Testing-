import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import Card from "./Card";
import { debug } from "console";

it("renders Card component", function(){
  render(<Card />)
})

it("snapshot test of Card component", function(){
  const {asFragment} = render(<Card />)
  expect(asFragment()).toMatchSnapshot()
})


it("renders Carousel component", function(){
  render(< Carousel />)
})

it("snapshot test of Carousel component", function(){
  const {asFragment} = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot()
})



it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function(){
  const {queryByTestId, queryByAltText} = render(<Carousel />)

  // show first image in the carousel
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

  //click on right arrow to show next picture:
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  //click on left arrow to show previous picture:
  const leftArrow = queryByTestId("left-arrow")
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument()

})

it("left arrow not there when on the first image", function(){
  const {queryByTestId} = render(< Carousel />)
  expect(queryByTestId("left-arrow")).toHaveClass("hidden")

  //click on right arrow, left arrow should appear
  const rightArrow = queryByTestId("right-arrow")
  fireEvent.click(rightArrow);

  const leftArrow = queryByTestId("left-arrow")
  expect(leftArrow).not.toHaveClass("hidden");
})


it("right arrow not there when on the last image", function(){
  const {queryByTestId} = render(< Carousel />)
  expect(queryByTestId("right-arrow")).not.toHaveClass("hidden");

  //click on right arrow, left arrow should appear
  const rightArrow = queryByTestId("right-arrow")
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow); 


  expect(rightArrow).toHaveClass("hidden");
})


