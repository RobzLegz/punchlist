import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Plan } from "../../types/project";
import IonIcon from "react-native-vector-icons/Ionicons";
import PullupModal from "../PullupModal";

const HomeContainer = () => {
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);

  const [title, setTitle] = useState("");
  const [blueprints, setBlueprints] = useState<Plan[]>([]);

  const [sheetOpen, setSheetOpen] = useState(false);

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
            onChangeText={(txt) => setTitle(txt)}
            value={title}
            placeholder="Nosaukums"
          />
        </View>

        <Text style={{ color: "gray", marginTop: 14 }}>Blueprinti</Text>
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

            <TouchableOpacity onPress={() => setSheetOpen(true)}>
              <IonIcon name="add" size={28} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", padding: 10 }}>
            {blueprints.length > 0 ? (
              <View></View>
            ) : (
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
            )}
          </View>
        </View>
      </ScrollView>

      {/* <PullupModal open={sheetOpen} setOpen={setSheetOpen}></PullupModal> */}
    </View>
  );
};

export default HomeContainer;
