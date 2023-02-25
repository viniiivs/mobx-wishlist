import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './components/App';
import { Group } from './models/Group';

import { getSnapshot } from 'mobx-state-tree';

let initialState = { users: {}}

let group = (window.group = Group.create(initialState))
group.load()

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp() {
  root.render(
    <React.StrictMode>
      <App group={ group } />
    </React.StrictMode>
  );
}

renderApp()

if (module.hot) {
  module.hot.accept(["./components/App"], () => {
    renderApp()
  })
  module.hot.accept(["./models/Group"], () => {
    const snapshot = getSnapshot(group)
    group = window.group = Group.create(snapshot)
    renderApp()
  })
}