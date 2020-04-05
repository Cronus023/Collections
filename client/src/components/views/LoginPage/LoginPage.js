import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { loginUser } from "../../../_actions/user_actions"
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Icon, Input, Button, Typography, Tooltip } from 'antd';
import { useDispatch } from "react-redux"
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import { FacebookOutlined,GoogleOutlined } from '@ant-design/icons';
const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState('')

  const responseGoogle = (response) => {
    console.log(response.profileObj)
    let dataToSubmit = {
      SocialNetworks: true,
      email: response.profileObj.googleId,
      name: response.profileObj.name,
      image: response.profileObj.imageUrl
    }
    dispatch(loginUser(dataToSubmit))
      .then(response => {
        if (response.payload.loginSuccess) {
          window.localStorage.setItem('userId', response.payload.userId);
          props.history.push("/");
        } else {
          setFormErrorMessage(response.payload.message)
        }
      })
  }

  const responseFacebook = response => {
    let dataToSubmit = {
      SocialNetworks: true,
      email: response.userID,
      name: response.name,
      image: response.picture.data.url
    }
    dispatch(loginUser(dataToSubmit))
      .then(response => {
        if (response.payload.loginSuccess) {
          window.localStorage.setItem('userId', response.payload.userId);
          props.history.push("/");
        } else {
          setFormErrorMessage(response.payload.message)
        }
      })
  }


  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                props.history.push("/");
              } else {
                setFormErrorMessage(response.payload.message)
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return <div className="app">
          <Title level={2}>Log In</Title>
          <form onSubmit={handleSubmit} style={{ width: '350px' }}>

            <Form.Item required>
              <Input
                id="email"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Enter your email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email ? 'text-input error' : 'text-input'
                }
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
            </Form.Item>

            <Form.Item required>
              <Input
                id="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password ? 'text-input error' : 'text-input'
                }
              />
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}
            </Form.Item>

            {formErrorMessage && (
              <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
            )}

            <Form.Item>
              <div>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                  Log in
                </Button>
              </div>
              <div>
                <FacebookLogin
                  appId="895250614235866"
                  fields="name,email,picture"
                  render={renderProps => (
                    <Tooltip title="Facebook-login">
                      <Button onClick={renderProps.onClick} style={{ width: "350px", background: "#191970", color: "#fff" ,height:"40px"}}><FacebookOutlined />Facebook</Button>
                    </Tooltip>
                  )}
                  callback={responseFacebook}
                />
              </div>
              <div>
                <GoogleLogin
                  clientId="333437658523-d3qdis6m7rrf2oe0cpemkpekbiqiqokn.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  render={renderProps => (
                    <Tooltip title="Google-login">
                      <Button onClick={renderProps.onClick} style={{ width: "350px", color: "#32CD32",height:"40px" }}><GoogleOutlined />Google</Button>
                    </Tooltip>
                  )}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
                Or <a href="/register">register now!</a>
            </Form.Item>
          </form>
        </div>
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


