import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Plan } from "../../types/project";
import IonIcon from "react-native-vector-icons/Ionicons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheet } from "@gorhom/bottom-sheet";

const HomeContainer = () => {
  const navigation = useNavigation<any>();
  const { expand } = useBottomSheet();

  const appInfo: AppInfo = useSelector(selectApp);

  const [title, setTitle] = useState("");
  const [blueprints, setBlueprints] = useState<Plan[]>([]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 48,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon name="arrow-back" size={28} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, width: "100%", padding: 20 }}>
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ color: "gray" }}>Projekta nosaukums</Text>

          <TextInput
            style={{
              width: "100%",
              height: 44,
              borderColor: "gray",
              borderWidth: 0.5,
              marginTop: 8,
              borderRadius: 5,
              paddingHorizontal: 10,
              fontSize: 16,
              color: "gray",
            }}
            placeholder="Nosaukums"
          />
        </View>

        <Text style={{ color: "gray", marginTop: 12 }}>Blueprinti</Text>
        <View
          style={{
            width: "100%",
            borderWidth: 0.5,
            borderColor: "gray",
            padding: 10,
            borderRadius: 5,
            marginTop: 8,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray", fontSize: 16 }}>Blueprints</Text>

            <TouchableOpacity onPress={() => expand()}>
              <IonIcon name="add" size={28} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", padding: 10 }}>
            <View
              style={{
                width: "100%",
                height: 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "gray", fontSize: 14 }}>
                Pagaidåm nav neviena blueprinta
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View>
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={["25%", "50%"]}>
          <BottomSheetScrollView
            style={{}}
            showsHorizontalScrollIndicator={false}
          >
            <Text>Awesome 🎉</Text>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </View>
  );
};

export default HomeContainer;
