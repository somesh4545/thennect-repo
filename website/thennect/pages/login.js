import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import axios from "../lib/axios";

const loginValidationSchema = yup.object().shape({
  emailId: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required")
    .nullable(),
  password: yup.string().required("Password is required").nullable(),
});

function login() {
  const handleLogin = (value) => {};

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-full md:max-w-7xl shadow-box rounded-xl h-full md:h-[80vh] flex flex-col md:flex-row p-10">
        <div className="flex-1 flex flex-col justify-evenly">
          <div className="space-x-2 hidden md:flex">
            <img
              src="/brand_logo_2.png"
              className="w-8 cursor-pointer object-contain"
            />
            <img
              src="/brand_name.png"
              className="w-28  md:inline-flex cursor-pointer object-contain"
            />
          </div>
          <div className="my-auto">
            <img className="object-contain h-[50vh]" src="/auth/login.png" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="fontBold text-4xl">Login</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleLogin}
            validationSchema={loginValidationSchema}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className="form-control"
                  />
                </div>

                <button className="btn btn-success mr-3">Login</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default login;
