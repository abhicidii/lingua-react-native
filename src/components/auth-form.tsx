import { useSSO, useSignIn, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants/images";
import { colors } from "../theme";
import VerificationModal from "./verification-modal";

type Props = {
  mode: "sign-up" | "sign-in";
};

const content = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    button: "Sign Up",
    footer: "Already have an account? ",
    link: "Log in",
    href: "/sign-in",
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey ✨",
    button: "Sign In",
    footer: "Don't have an account? ",
    link: "Sign up",
    href: "/sign-up",
  },
} as const;

const socialButtons = [
  { label: "Continue with Google", icon: images.iconGoogle, strategy: "oauth_google" },
  { label: "Continue with Facebook", icon: images.iconFacebook, strategy: "oauth_facebook" },
  { label: "Continue with Apple", icon: null, strategy: "oauth_apple" },
] as const;

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const copy = content[mode];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, fetchStatus: signInStatus } = useSignIn();
  const { signUp, fetchStatus: signUpStatus } = useSignUp();
  const { startSSOFlow } = useSSO();
  const busy = signInStatus === "fetching" || signUpStatus === "fetching";

  // Sign-up: email + password, then a code is emailed. Sign-in: a code is emailed.
  const handleSubmit = async () => {
    setError(null);
    if (mode === "sign-up") {
      const { error: createError } = await signUp.password({ emailAddress: email, password });
      if (createError) return setError(createError.message);
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) return setError(sendError.message);
    } else {
      const { error: sendError } = await signIn.emailCode.sendCode({ emailAddress: email });
      if (sendError) return setError(sendError.message);
    }
    setVerifying(true);
  };

  // Opens the provider in a browser session. Cancelling returns no session, so we do nothing.
  const handleSocial = async (strategy: (typeof socialButtons)[number]["strategy"]) => {
    setError(null);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch {
      setError("Could not sign in with that provider. Please try again.");
    }
  };

  const handleVerify = async (code: string) => {
    const resource = mode === "sign-up" ? signUp : signIn;
    const { error: verifyError } =
      mode === "sign-up"
        ? await signUp.verifications.verifyEmailCode({ code })
        : await signIn.emailCode.verifyCode({ code });
    if (verifyError) return verifyError.message;
    if (resource.status !== "complete") return "Verification incomplete. Please try again.";

    const { error: finalizeError } = await resource.finalize({
      navigate: () => router.replace("/"),
    });
    if (finalizeError) return finalizeError.message;
    setVerifying(false);
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-7 pb-6">
          {/* Back */}
          <TouchableOpacity onPress={() => router.back()} className="mt-6 h-10 w-10 justify-center">
            <View className="ml-1 h-3 w-3 rotate-45 border-b-2 border-l-2 border-text-primary" />
          </TouchableOpacity>

          {/* Heading */}
          <Text className="text text--h2 mt-6 text-[26px] font-bold">{copy.title}</Text>
          <Text className="text text--body-md text--secondary mt-2 text-[15px]">{copy.subtitle}</Text>

          {/* Mascot */}
          <View className="mt-3 h-[120px] items-center overflow-hidden">
            <Image source={images.mascotAuth} className="-mt-[40px] h-[260px] w-[260px] -scale-x-100" resizeMode="contain" />
            <Text className="absolute left-[18%] top-4 text-[18px] text-warning">✦</Text>
            <Text className="absolute right-[22%] top-6 text-[16px] text-blue">✦</Text>
            <Text className="absolute right-[16%] top-[58px] text-[18px] text-warning">✦</Text>
          </View>

          {/* Fields */}
          <View className="mt-4 rounded-[20px] border border-border px-5 py-3">
            <Text className="text text--caption text--secondary text-[12px]">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              placeholderTextColor={colors["text-secondary"]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="text text--body-lg mt-1 p-0 text-[16px]"
            />
          </View>

          {mode === "sign-up" && (
            <View className="mt-4 flex-row items-center rounded-[20px] border border-border px-5 py-3">
              <View className="flex-1">
                <Text className="text text--caption text--secondary text-[12px]">Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={colors["text-secondary"]}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="text text--body-lg mt-1 p-0 text-[16px]"
                />
              </View>
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)} className="h-10 w-10 items-center justify-center">
                <Image source={showPassword ? images.iconEyeOff : images.iconEye} className="h-6 w-6" resizeMode="contain" />
              </TouchableOpacity>
            </View>
          )}

          {/* Main button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={busy || !email}
            className="button button--primary mt-3.5 h-[58px] rounded-[18px]"
          >
            <Text className="button__label text-[18px]">{copy.button}</Text>
          </TouchableOpacity>

          {error && <Text className="text text--body-md mt-3 text-center text-error">{error}</Text>}

          {/* Required by Clerk bot protection on sign-up */}
          {mode === "sign-up" && <View nativeID="clerk-captcha" />}

          {/* Divider */}
          <View className="mt-5 flex-row items-center">
            <View className="h-px flex-1 bg-border" />
            <Text className="text text--body-md text--secondary mx-4">or continue with</Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          {/* Social */}
          <View className="mt-4">
            {socialButtons.map((item) => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.7}
                onPress={() => handleSocial(item.strategy)}
                className="mb-2.5 h-[54px] flex-row items-center rounded-[18px] border border-border"
              >
                <View className="w-[70px] items-center">
                  {item.icon ? (
                    <Image source={item.icon} className="h-7 w-7" resizeMode="contain" />
                  ) : (
                    <Text className="text text-[28px]">{"\uF8FF"}</Text>
                  )}
                </View>
                <Text className="text text--body-lg font-medium">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View className="flex-1 justify-end pt-6">
            <Text className="text text--body-md text--secondary text-center">
              {copy.footer}
              <Text
                onPress={() => router.replace(copy.href)}
                className="font-bold text-purple"
              >
                {copy.link}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <VerificationModal visible={verifying} email={email} onClose={() => setVerifying(false)} onSubmit={handleVerify} />
    </SafeAreaView>
  );
}
