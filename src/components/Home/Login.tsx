import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";

import { useAuth } from "./UserContext";

const Banner: React.FC = () => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${"image/yoga-banner-home.jpg"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1>Start your yoga journey with us.</h1>
    </div>
  );
};

//Stores the path information where the user was before logging in.
interface LocationState {
  from: {
    pathname: string;
  };
}

const LoginForm: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const { login } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"), //form validation
  });

  return (
    <Formik
      initialValues={{ email: "", firstName: "", lastName: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        //when form is submitted
        // Call API to create a new user
        fetch("http://localhost:8000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("An error occurred.");
            }
            return response.json();
          })
          .then((data) => {
            const user = {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
            };

            // After successfully creating the user, create a basket for the user
            fetch(`http://localhost:8000/user/${data.userId}/basket`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: data.userId }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    "An error occurred while creating the basket."
                  );
                }
                return response.json();
              })
              .then((basketData) => {
                console.log("Basket created:", basketData);
                login(user, basketData.basketId);
              })
              .catch((error) => {
                console.error("Error creating basket:", error);
              });
            actions.resetForm(); // Reset form fields
            actions.setSubmitting(false); // Set submitting to false
            const { from } = location.state || { from: { pathname: "/home" } };
            history.replace(from);
          })
          .catch((error) => {
            console.error("Error:", error);
            actions.setSubmitting(false); // Set submitting to false
          });
      }}
    >
      {({ isSubmitting }) => (
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="login-container">
              <Form className="login-form" id="login-form">
                <Field
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
                <Field
                  className="form-control"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
                <Field
                  className="form-control"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-message"
                />

                <button
                  className="btn login-btn"
                  type="submit"
                  disabled={isSubmitting} // button cannot be used when isSubmitting is true
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </button>
              </Form>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      )}
    </Formik>
  );
};

//login component
const Login: React.FC = () => {
  return (
    <div>
      <Banner />
      <LoginForm />
    </div>
  );
};

export default Login;
