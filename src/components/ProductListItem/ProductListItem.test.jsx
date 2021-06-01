import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "../../store/customReactTestLibrary";
import Product from "./ProductListItem";
import Nav from "../@mixins/Nav/Nav";

const product = {
  id: 1,
  name: "탕용기(소)",
  price: 57000,
  thumbnail: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
};

describe("Product", () => {
  test("카트 아이콘을 클릭하면 카트아이콘 대신 숫자 1이 표시된다", () => {
    render(<Product product={product} />);

    const button = screen.getByRole("button");
    const cartIcon = screen.getByTitle("cart-icon");

    expect(cartIcon).toBeInTheDocument();

    fireEvent.click(cartIcon);

    expect(cartIcon).not.toBeInTheDocument();
    expect(button).toHaveTextContent("1");
  });

  test("숫자를 클릭하면 숫자가 1씩 증가한다", () => {
    render(<Product product={product} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(button).toHaveTextContent("1");

    fireEvent.click(button);
    expect(button).toHaveTextContent("2");

    fireEvent.click(button);
    expect(button).toHaveTextContent("3");
  });

  test("장바구니에 담긴 상품의 개수가 Nav 장바구니 메뉴 우측에 표시된다.", () => {
    render(
      <BrowserRouter>
        <Nav />
        <Product product={product} />
      </BrowserRouter>
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    const cartLink = screen.getByRole("link", { name: "cart-link" });
    expect(cartLink).toHaveTextContent("4");
  });
});
