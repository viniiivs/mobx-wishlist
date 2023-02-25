import React from "react";
import { observer } from 'mobx-react'

import WishListItemView from "./WishListItemView";
import WishListItemEntry from "./WishListItemEntry";

const WishListView = ({ wishList, readonly }) => (
  <div>
    <ul>
      {wishList.items.map((item, idx) => (
        <WishListItemView key={idx} item={item} readonly={readonly} />
      ))}
    </ul>
    <ul className="total-price">
      Total: $ {wishList.totalPrice.toFixed(2)}
    </ul>
    {!readonly && <WishListItemEntry wishList={wishList} />}
  </div>
)

export default observer(WishListView)