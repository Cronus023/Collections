import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import UploadPage from "./views/UploadPage/UploadPage";
import MyCollectionsPage from "./views/MyCollectionsPage/MyCollectionsPage";
import DetailCollectionPage from  "./views/DetailCollectionPage/DetailCollectionPage";
import UpdateCollectionPage from  "./views/UpdateCollectionPage/UpdateCollectionPage";
import NewItemPage from './views/NewItemPage/NewItemPage';
import MyItemsPage from './views/MyItemsPage/MyItemsPage';
import UpdateItemPage from './views/UpdateItemPage/UpdateItemPage';
import CommentPage from './views/CommentPage/CommentPage';
import Detail from './views/Top3DetailPage/Top3DetailPage';
function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/top3/:collectionId" component={Auth(Detail, null)} />
          <Route exact path="/collections/upload/:userId" component={Auth(UploadPage, true)} />
          <Route exact path="/collections/get/:userId" component={Auth(MyCollectionsPage, null)} />
          <Route exact path="/collections/:collectionId" component={Auth(DetailCollectionPage, null)} />
          <Route exact path="/collections/change/:collectionId" component={Auth(UpdateCollectionPage, null)} />
          <Route exact path="/collections/newItem/:collectionId" component={Auth(NewItemPage, null)} />
          <Route exact path="/collections/myItems/:collectionId" component={Auth(MyItemsPage, null)} />
          <Route exact path="/collections/myItems/updateItem/:itemId" component={Auth(UpdateItemPage, null)} />
          <Route exact path="/items/comments/:itemId" component={Auth(CommentPage, null)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
