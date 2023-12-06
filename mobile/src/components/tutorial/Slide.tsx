import { StyleSheet, Image, View, useWindowDimensions } from "react-native";
import React from "react";
import { H3, P } from "../../styles/text";
import { accent, darkGray } from "../../styles/colors";

const Slide: React.FC<{
  id: string;
  title: string;
  description: string;
  image: any;
}> = ({ ...props }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image source={props.image} style={styles.image} />

      <View style={{ flex: 0.3, paddingTop: 10 }}>
        <H3 style={{ fontSize: 28, color: accent, marginBottom: 4 }}>
          {props.title}
        </H3>
        <P style={{fontSize: 18, color: darkGray}}>{props.description}</P>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
  },
  image: {
    flex: 0.5,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "100%",
  },
});
