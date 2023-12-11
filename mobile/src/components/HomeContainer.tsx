import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AppInfo, deleteProject, selectApp } from "../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeContainer = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ width: "100%", flex: 1 }}>
        {appInfo.projects.length > 0 ? (
          <ScrollView
            style={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {appInfo.projects.map((project, i) => (
              <View
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  borderWidth: 0.5,
                  borderRadius: 10,
                  borderColor: "gray",
                }}
                key={i}
              >
                <Text style={{ fontSize: 20, color: "#000000" }}>
                  {project.title}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    color: "red",
                    marginTop: 4,
                    textDecorationLine: "underline",
                  }}
                >
                  {project.blueprints.flatMap((bl) => bl.points).length} defekti
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 12,
                    width: "100%",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#000000",
                        height: 44,
                        alignSelf: "stretch",
                      }}
                      onPress={() =>
                        navigation.navigate("Project", { ...project })
                      }
                    >
                      <Text style={{ color: "#ffffff", fontSize: 16 }}>
                        Apskatit
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: "#000",
                      marginHorizontal: 8,
                      width: 90,
                      height: 44,
                    }}
                    onPress={() =>
                      navigation.navigate("Create", { ...project })
                    }
                  >
                    <Text style={{ color: "#000", fontSize: 16 }}>Rediget</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      height: 44,
                    }}
                    onPress={() => dispatch(deleteProject(i))}
                  >
                    <Text style={{ color: "#ffffff", fontSize: 16 }}>
                      Dzest
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "gray", fontSize: 16 }}>
              Pagaidåm nav neviena projekta
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          width: "100%",
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            height: 60,
            backgroundColor: "#000",
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("Create")}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Jauns Projekts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeContainer;
