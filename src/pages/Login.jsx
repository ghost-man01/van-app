import React, { useState } from "react"
import {
    useLoaderData,
    Form,
    redirect,
    useActionData,
    useNavigation
} from "react-router-dom"
import { loginUser } from "../api"

export async function loginLoader({ request }) {

    return new URL(request.url).searchParams.get("message")

}

export async function action({ request }) {

    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    try {
        const data = await loginUser({ email, password })
        localStorage.setItem("loggedIn", true)
        const response = redirect(pathname)
        response.body = true
        return response;

    } catch (err) {
        return err.message
    }

}

export default function Login() {
    const message = useLoaderData();
    const errorMessage = useActionData();
    const navigate = useNavigation();



    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h4 className="red">{message}</h4>}
            {errorMessage && <h4 className="red">{errorMessage}</h4>}
            <Form method="post" className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                    disabled={navigate.state === 'submitting'}
                >
                    {navigate.state === 'submitting' ? 'Logging in...' : 'Log in'}
                </button>
            </Form>
        </div>
    )

}
