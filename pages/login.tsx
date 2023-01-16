import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "../components/Button/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import Image from "next/image";

// useSession is a helper function that shows if there is an active session and it displays the session information.
// use case for session would be conditional rendering based on if there is an active session (user logged in) or not

export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { profile } = useProfile();
  const handleClick = async () => {
    router.push("/usersettings");
  };
  // IF user = customer THEN route to /
  //IF user is business THEN route to business home
  useEffect(() => {
    if (profile?.user_type === "consumer") {
      router.push("/");
    } else if (profile?.user_type === "business") {
      router.push("/businesshome");
    } else if (profile?.user_type === "") {
      router.push("/usertype");
    }
  }, [profile]);

  return (
    <div className="flex w-full h-screen justify-center items-center bg-slate-800">
      {!session ? (
        <div className="flex flex-col justify-around h-4/6 items-center">
          <Image src="/logo.svg" alt="logo" width="400" height="400" />
          <Auth
            providers={["facebook", "google"]}
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    anchorTextColor: "#F59E0B",
                    brand: "#818CF8",
                    brandAccent: "#C7D2FE",
                    brandButtonText: "#334155",
                    defaultButtonBackground: "#818CF8",
                    defaultButtonBackgroundHover: "#C7D2FE",
                    defaultButtonBorder: "#818CF8",
                    defaultButtonText: "#1E293B",
                    dividerBackground: "#F59E0B",
                    inputBackground: "#CBD5E1",
                    inputText: "#1E293B",
                    inputPlaceholder: "#1E293B",
                    inputLabelText: "#F59E0B",
                    inputBorder: "#F59E0B",
                    inputBorderHover: "#D97706",
                    inputBorderFocus: "#D97706",
                    messageText: "#1E293B",
                    messageTextDanger: "#D97706",
                  },
                  fonts: {
                    bodyFontFamily: `Open Sans, ui-sans-serif, sans-serif`,
                    buttonFontFamily: `Open Sans, ui-sans-serif, sans-serif`,
                    inputFontFamily: `Open Sans, ui-sans-serif, sans-serif`,
                    labelFontFamily: `Open Sans, ui-sans-serif, sans-serif`,
                  },
                  fontSizes: {
                    baseBodySize: "13px",
                    baseInputSize: "14px",
                    baseLabelSize: "14px",
                    baseButtonSize: "14px",
                  },
                  borderWidths: {
                    buttonBorderWidth: "0px",
                    inputBorderWidth: "1px",
                  },
                },
              },
            }}
            theme="light"
          />
        </div>
      ) : (
        <div>
          <Button onClick={handleClick} buttonText="User Settings" />
          <p>You are logged in</p>
          <p>{profile?.full_name}</p>
        </div>
      )}
    </div>
  );
}
