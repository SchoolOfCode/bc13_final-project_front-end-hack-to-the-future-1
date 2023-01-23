import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function AuthUI() {
  const supabase = useSupabaseClient();
  return (
    <Auth
      providers={["facebook", "google"]}
      supabaseClient={supabase}
      localization={{
        variables: {
          sign_up: {
            button_label: "SIGN UP",
          },
          sign_in: {
            button_label: "SIGN IN",
          },
        },
      }}
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
              messageText: "#A3E635",
              messageTextDanger: "#dc2626",
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
  );
}
