import { observer } from 'mobx-react';
import React, { Component } from 'react';
import logo from '../assets/logo.png';

import WishListView from './WishListView';

class App extends Component {
  constructor(props) {
    super()
    this.state = { selectedUser: null }
  }

  render() {
      const { group } = this.props
      const selectedUser = group.users.get(this.state.selectedUser)
      return (
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo'/>
            <h1 className='App-title'>Wishlist</h1>
          </header>
          <div className='App-menu'>
            <button onClick={group.reload}>🔄️ Reload</button>
            <select onChange={this.onSelectUser}>
              <option>- Select User -</option>
              {Array.from(group.users.values()).map(user => (
                <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
              ))}
            </select>
            <button onClick={group.drawLots}>🎁 Draw Lots</button>
          </div>
          {selectedUser &&  <User user={selectedUser} />}
        </div>
    )
  }

  onSelectUser = event => {
    this.setState({ selectedUser: event.target.value })
  }
}

const User = observer(({ user }) => (
  <div>
    <WishListView wishList={user.wishList} />
    <button style={{ margin: '10px'}} onClick={user.getSuggestions}>💡Add Suggestions</button>
    <hr />
    <h2>{user.recipient ? user.recipient.name : ""}</h2>
    { user.recipient && <WishListView wishList={user.recipient.wishList} readonly />}
  </div>
))

export default observer(App)
