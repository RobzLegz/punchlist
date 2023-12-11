import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
  Image,
  GestureResponderEvent,
} from "react-native";
import React, { useRef, useState } from "react";
import { addNewProject } from "../../redux/slices/appSlice";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Plan, Point } from "../../types/project";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { PIN_SIZE } from "../../constants";

const HomeContainer = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const route = useRoute<any>();

  const sheetRef = useRef<BottomSheet>(null);

  const [title, setTitle] = useState(
    route.params?.title ? route.params.title : ""
  );
  const [blueprints, setBlueprints] = useState<Plan[]>(
    route.params?.blueprints ? route.params.blueprints : []
  );

  const [newBluePrint, setNewBluePrint] = useState<Plan>({
    title: "",
    image: "",
    points: [],
  });

  const [newPin, setNewPin] = useState<Point | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length && result.assets[0]) {
      sheetRef.current?.snapToIndex(1);
      setNewBluePrint({ ...newBluePrint, image: result.assets[0].uri });
    }
  };

  const addNewPin = (event: GestureResponderEvent) => {
    setNewPin({
      geo: null,
      coords: {
        x: event.nativeEvent.locationX - PIN_SIZE / 2,
        y: event.nativeEvent.locationY - PIN_SIZE / 2,
      },
      description: "",
      irl_image: null,
    });
  };

  const handleSavePin = () => {
    if (!newPin) {
      return;
    }

    setNewBluePrint({
      ...newBluePrint,
      points: [...newBluePrint.points, newPin],
    });

    setNewPin(null);
  };

  const handleSaveBlueprint = () => {
    setBlueprints([...blueprints, newBluePrint]);

    setNewBluePrint({ title: "", image: "", points: [] });

    sheetRef.current?.close();
    setSheetOpen(false);
  };

  const handleProjectSave = () => {
    if (!blueprints.length) {
      return;
    }

    dispatch(
      addNewProject({
        title: title,
        blueprints: blueprints,
      })
    );

    navigation.goBack();
  };

  const [Sheetopen, setSheetOpen] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        zIndex: 20,
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
              borderBottomWidth: 0.5,
              marginBottom: 4,
              padding: 10,
            }}
          >
            <Text style={{ color: "gray", fontSize: 16 }}>Blueprints</Text>

            <TouchableOpacity
              onPress={() => {
                sheetRef.current?.expand();
                setSheetOpen(true);
              }}
            >
              <IonIcon name="add" size={28} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", padding: 10, paddingBottom: 4 }}>
            {blueprints.length > 0 ? (
              <View>
                {blueprints.map((bp, i) => (
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: 48,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      backgroundColor: i % 2 === 0 ? "#eee" : "#eee",
                      marginBottom: 8,
                    }}
                    onPress={() => {
                      setNewBluePrint(bp);
                      setBlueprints(blueprints.filter((_, j) => j !== i));
                      setSheetOpen(true);
                      sheetRef.current?.snapToIndex(1);
                    }}
                    key={i}
                  >
                    <Text style={{ color: "gray", fontSize: 16 }}>
                      {bp.title} | {bp.points.length} defekti
                    </Text>

                    <MaterialIcon name="edit" size={20} color="gray" />
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
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

      {Sheetopen ? (
        <Pressable
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          onPress={() => {
            setSheetOpen(false);
            sheetRef.current?.close();
          }}
        />
      ) : null}

      <BottomSheet
        index={-1}
        snapPoints={["40%", "80%"]}
        ref={sheetRef}
        onClose={() => setSheetOpen(false)}
        enablePanDownToClose
        style={{ zIndex: 20 }}
      >
        <BottomSheetScrollView style={{ width: "100%", padding: 20 }}>
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ color: "gray" }}>Blueprinta nosaukums</Text>

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
              onChangeText={(txt) =>
                setNewBluePrint({ ...newBluePrint, title: txt })
              }
              value={newBluePrint.title}
              placeholder="Nosaukums"
            />
          </View>

          {newBluePrint.image ? (
            <View
              style={{
                width: "100%",
                marginTop: 12,
                position: "relative",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                style={{ width: "100%" }}
                activeOpacity={1}
                onPress={(e) => addNewPin(e)}
              >
                <Image
                  source={{ uri: newBluePrint.image }}
                  style={{ width: "100%", height: 360, resizeMode: "contain" }}
                />
              </TouchableOpacity>

              {newBluePrint.points.map((p, i) => (
                <TouchableOpacity
                  key={i}
                  disabled={newPin ? true : false}
                  style={{
                    position: "absolute",
                    top: p.coords.y,
                    left: p.coords.x,
                    width: PIN_SIZE,
                    height: PIN_SIZE,
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: "#000",
                    opacity: newPin ? 0.4 : 1,
                  }}
                  onPress={() => {
                    setNewPin(p);
                    setNewBluePrint({
                      ...newBluePrint,
                      points: newBluePrint.points.filter((_, j) => j !== i),
                    });
                  }}
                >
                  <Text style={{ color: "white", fontSize: 28 }}>!</Text>
                </TouchableOpacity>
              ))}

              {newPin ? (
                <>
                  <View
                    style={{
                      position: "absolute",
                      top: newPin.coords.y,
                      left: newPin.coords.x,
                      width: PIN_SIZE,
                      height: PIN_SIZE,
                      backgroundColor: "red",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: "#000",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 28 }}>!</Text>
                  </View>

                  <View style={{ width: "100%", marginTop: 12 }}>
                    <Text style={{ color: "gray" }}>Defekta apraksts</Text>

                    <TextInput
                      multiline
                      numberOfLines={3}
                      onChangeText={(text) =>
                        setNewPin({ ...newPin, description: text })
                      }
                      value={newPin.description}
                      placeholder="Apraksts"
                      style={{
                        width: "100%",
                        borderColor: "gray",
                        borderWidth: 0.5,
                        marginTop: 8,
                        borderRadius: 5,
                        padding: 10,
                        fontSize: 16,
                        color: "gray",
                        textAlignVertical: "top",
                      }}
                    />

                    <View style={{ width: "100%", flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          backgroundColor: "#000",
                          height: 50,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 12,
                          marginRight: 4,
                        }}
                        onPress={handleSavePin}
                      >
                        <Text style={{ color: "#fff", fontSize: 18 }}>
                          Saglabåt
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          backgroundColor: "#fff",
                          width: 100,
                          height: 50,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 12,
                          marginLeft: 4,
                          borderColor: "#000",
                          borderWidth: 2,
                        }}
                        onPress={() => setNewPin(null)}
                      >
                        <Text style={{ color: "#000", fontSize: 18 }}>
                          Dzest
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      color: "gray",
                      marginTop: 12,
                    }}
                  >
                    Pievienojiet defektus spiezot uz plana bildes.
                  </Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#000",
                      width: "100%",
                      height: 50,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                    onPress={handleSaveBlueprint}
                  >
                    <Text style={{ color: "#fff", fontSize: 18 }}>
                      Saglabåt
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            <TouchableOpacity
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                height: 44,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: "gray",
                marginTop: 12,
                paddingHorizontal: 5,
              }}
              onPress={pickImage}
            >
              <IonIcon name="add" size={28} color="gray" />

              <Text style={{ color: "gray", fontSize: 16, marginLeft: 0 }}>
                Pievienot rasejumu
              </Text>
            </TouchableOpacity>
          )}
        </BottomSheetScrollView>
      </BottomSheet>

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
          onPress={handleProjectSave}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Saglabåt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeContainer;
