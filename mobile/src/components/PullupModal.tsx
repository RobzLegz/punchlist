import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withTiming,
  SlideInDown,
  SlideOutDown,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

const PullupModal: React.FC<{
  open?: boolean;
  overdrag?: number;
  height?: number;
  children?: React.ReactNode;
  setOpen: React.Dispatch<boolean>;
}> = ({ open = false, overdrag = 0, height = 200, children, setOpen }) => {
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-overdrag, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < height / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(height, {}, () => {
          runOnJS(() => setOpen(false))();
        });
      }
    });

//   const translateY = useAnimatedStyle(() => ({
//     transform: [{ translateY: offset.value }],
//   }));

  return (
    <>
      {open && (
        <View
          style={{
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 20,
            width: "100%",
          }}
        >
          <>
            <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
            <View style={{ ...styles.sheet, bottom: overdrag * 1.1, height }}>
              <ScrollView>{children}</ScrollView>
            </View>
          </>
        </View>
      )}
    </>
  );
};

export default PullupModal;

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: "#fff",
    padding: 16,
    width: "100%",
    position: "absolute",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  },
});
