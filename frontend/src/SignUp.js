import React from 'react';
import {
    AmplifySignUp
  } from "@aws-amplify/ui-react"


function SignUp() {
    return (
    <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
            {
                type: "username",
                label: "Enter username",
                placeholder: "Custom username placeholder",
                inputProps: { required: true},
            },
            {
                type: "email",
                label: "Custom Email Label",
                placeholder: "Custom email placeholder",
                inputProps: { required: true, autocomplete: "username" },
            },
            {
                type: "password",
                label: "Custom Password Label",
                placeholder: "Custom password placeholder",
                inputProps: { required: true, autocomplete: "new-password" },
            },
            {
                type: "phone_number",
                label: "Custom Phone Label",
                placeholder: "Custom phone placeholder",
            },
        ]}
    />
    )
}

export default SignUp;
