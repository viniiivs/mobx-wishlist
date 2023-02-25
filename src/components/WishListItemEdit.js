import React, { Component } from "react";
import { observer } from "mobx-react";

class WishListItemEdit extends Component {
  render() {
    const { item } = this.props
    return (
      <div className="item-edit">
        <div className="item-edit-label">
          <span>Item:</span>
          <span>Price:</span>
          <span>Image:</span>
        </div>
        <div className="item-edit-input">
          <input value={item.name} onChange={this.onNameChange} placeholder='Name' />
          <br />
          <input type="number" step="0.01" value={item.price} onChange={this.onPriceChange} />
          <br />
          <input value={item.image} onChange={this.onImageChange} placeholder='Link'/>
          <br />
        </div>
      </div>
    )
  }
  onNameChange = event => {
    this.props.item.changeName(event.target.value)
  }
  
  onPriceChange = event => {
    const price = parseFloat(event.target.value.replace(',', '.'))
    if (!isNaN(price)) this.props.item.changePrice(price)
  }

  onImageChange = event => {
    this.props.item.changeImage(event.target.value)
  }
}

export default observer(WishListItemEdit)