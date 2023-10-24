import * as Yup from 'yup';
import { Formik } from 'formik';
import { ReactComponent as IconButton } from '../../images/Icon.svg';
import { ReactComponent as HideIcon } from '../../images/eye-slash.svg';
import { ReactComponent as ShowIcon } from '../../images/eye.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/auth/authSlice';

import {
  Form,
  Title,
  Label,
  Field,
  ErrorMessage,
  Input,
  PasswordInput,
  Button,
  HidePassword,
} from './LoginForm.styled';

const userSchema = Yup.object().shape({
    username: Yup.string()
      .min(1, 'Username must be at least 1 character long')
      .matches(/^[a-zA-Z0-9@.]+$/, 'Username must contain only Latin characters')
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(1, 'Password must be at least 1 character long')
      .matches(/^\S*$/, 'Password must not contain spaces'),
  });
  

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  
  const handleSubmit = e => {
    e.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = e.currentTarget;

    dispatch(loginSuccess({ username, password }));
    e.currentTarget.reset();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={userSchema}
    >
      {({ isSubmitting, values, errors, touched }) => {
        const isValid = field =>
          touched[field] && errors[field]
            ? 'is-invalid'
            : touched[field]
            ? 'is-valid'
            : '';

        return (
          <Form onSubmit={handleSubmit}>
            <Title>Log In</Title>
            <Label className={isValid('username')}>
              username
              <Input>
                <Field
                  className={isValid('username')}
                  type="username"
                  name="username"
                  placeholder="Enter username"
                  value={values.username}
                />
              </Input>
              {isValid('username') === 'is-valid' && (
                <p>This is a CORRECT username</p>
              )}
              <ErrorMessage name="username" component="div" />
            </Label>
            <Label className={isValid('password')}>
              Password
              <PasswordInput>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  className={isValid('password')}
                  name="password"
                  placeholder="Enter password"
                  value={values.password}
                />
                <HidePassword type="button" onClick={handleShowPassword}>
                  {showPassword ? <ShowIcon /> : <HideIcon />}
                </HidePassword>
              </PasswordInput>
              {isValid('password') === 'is-valid' && (
                <p>This is a CORRECT password</p>
              )}
              <ErrorMessage name="password" component="div" />
            </Label>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting' : 'Log in'}
              <IconButton style={{ width: '18px', height: '18px' }} />
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};