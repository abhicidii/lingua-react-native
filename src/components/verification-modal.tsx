import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, View } from "react-native";

const CODE_LENGTH = 6;

type Props = {
  visible: boolean;
  email: string;
  onClose: () => void;
  // Returns an error message, or null when the code was accepted
  onSubmit: (code: string) => Promise<string | null>;
};

export default function VerificationModal({ visible, email, onClose, onSubmit }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    setError(null);

    // Last digit entered -> verify with Clerk
    if (digits.length === CODE_LENGTH) {
      const message = await onSubmit(digits);
      if (message) {
        setError(message);
        setCode("");
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "rgba(13, 19, 43, 0.5)" }}
      >
        <View className="rounded-[28px] bg-background p-6">
          <Text className="text text--h3 text-center">Check your email</Text>
          <Text className="text text--body-md text--secondary mt-2 text-center">
            {`We sent a verification code to ${email || "your email"}. Enter the 6-digit code below.`}
          </Text>

          <View className="mt-6">
            <View className="flex-row justify-between">
              {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                <View
                  key={index}
                  className={`h-14 w-12 items-center justify-center rounded-2xl border bg-surface ${
                    index === code.length ? "border-deep-purple" : "border-border"
                  }`}
                >
                  <Text className="text text--h3">{code[index] ?? ""}</Text>
                </View>
              ))}
            </View>
            {/* Invisible input on top of the boxes: tapping them focuses it */}
            <TextInput
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              autoFocus
              caretHidden
              className="absolute h-full w-full opacity-0"
            />
          </View>
          {error && <Text className="text text--body-md mt-4 text-center text-error">{error}</Text>}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
