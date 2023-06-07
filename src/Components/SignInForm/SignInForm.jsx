import React from "react";
import "./SignInForm.css";

function SignInForm({ formDetails, btnDisabled, errorMessage }) {
  const { formFields, submit } = formDetails;

  return (
    <form className="form">
      {formFields.map((field) => {
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            onChange={field.onChange}
            value={field.value}
            key={field.id}
          />
        );
      })}
      {(errorMessage && errorMessage.length) && <div className="error-message">{errorMessage}</div>}
      <button className={btnDisabled?"btn-disabled":""} disabled={btnDisabled} onClick={submit}>{formDetails.btn}</button>
    </form>
  );
}

export default SignInForm;
