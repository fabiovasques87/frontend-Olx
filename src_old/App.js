import React from "react";
import { connect } from "react-redux";

import App from './Routes/myRoutes';

import { Template } from "./Components/MainComponents";
import { Header } from "./Components/partials/Header";
import { Footer } from "./Components/partials/Footer";


const Page = (props) => {
  return (
          <div>
            <Template>
              <Header />
                  <App />
              <Footer />
            </Template>
          </div>

  );
}                                 

const mapStateToProps = (state) => {
  //criar uma prop dentro do componente
  return {
    user: state.user
  };
}

const mapDisptchToProps= (dispatch) => {

}

export default connect(mapStateToProps, mapDisptchToProps)(Page);