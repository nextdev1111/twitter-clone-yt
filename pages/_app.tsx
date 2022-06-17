import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import LoadingPage from "../components/LoadingPage";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  const [authenticated, setAuthenticated] = useState<String>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // we are subscribing to the auth state
    const { data: authListner } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // handleAuthChange

        if (event === "SIGNED_IN") {
          setAuthenticated("authenticated");
        } else if (event === "SIGNED_OUT") {
          setAuthenticated("not-authenicated");
        }
      }
    );

    // checking the user
    checkUser();

    return () => {
      authListner?.unsubscribe();
    };
  });

  // handleAuthChange
  async function handleAuthChange(
    event: AuthChangeEvent,
    session: Session | null
  ) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  // checkUser
  async function checkUser() {
    const user = supabase.auth.user();

    if (user) {
      setAuthenticated("authenticated");
    } else if (!user) {
      setAuthenticated("not-authenicated");
    }

    setLoading(false);
  }

  if (loading) return <LoadingPage />;

  return (
    <RecoilRoot>
      <Toaster />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
