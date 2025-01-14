import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartTotalQuantity } from "../../../store/modules/cartSlice";
import CartIcon from "../../@shared/CartIcon/CartIcon";
import { ReactComponent as ShoppingCart } from "../../../assets/shopping-cart.svg";
import { ReactComponent as Receipt } from "../../../assets/receipt.svg";
import * as S from "./Nav.styled";
import PATH from "../../../constants/path";

const Nav = () => {
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <S.Nav>
      <S.NavWrapper>
        <S.TitleLink to={PATH.HOME}>
          <CartIcon />
          <S.Title>WOOWA SHOP</S.Title>
        </S.TitleLink>
        <S.NavMenu>
          <S.ListItem>
            <S.CartLink to={PATH.CART} aria-label="cart-link">
              <S.SmallLinkName as={ShoppingCart} />
              <S.LinkName>장바구니</S.LinkName>

              {cartTotalQuantity > 0 && (
                <S.CartQuantity className="cart-amount">
                  {cartTotalQuantity}
                </S.CartQuantity>
              )}
            </S.CartLink>
          </S.ListItem>
          <S.ListItem>
            <Link to={PATH.ORDER}>
              <S.SmallLinkName as={Receipt} />
              <S.LinkName>주문목록</S.LinkName>
            </Link>
          </S.ListItem>
        </S.NavMenu>
      </S.NavWrapper>
    </S.Nav>
  );
};

export default Nav;
