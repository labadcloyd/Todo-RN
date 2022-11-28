import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [currentTodo, setCurrentTodo] = useState();
  const [todoList, setTodoList] = useState([]);

  function addTodo() {
    setTodoList((prevValue) => {
      return [{ key: prevValue.length, value: currentTodo }, ...prevValue];
    });
    setCurrentTodo("");
  }
  function removeTodo(value) {
    setTodoList((prevValue) => {
      const newValue = [];
      prevValue.forEach((item) => {
        if (item.key !== value.key) newValue.push(item);
      });
      return newValue;
    });
  }

  function TodoItem({ item }) {
    return (
      <View style={[styles.flat_list_item, styles.shadow_prop]}>
        <View style={styles.flat_list_text}>
          <Text>{item.value}</Text>
        </View>
        <View style={styles.flat_list_btn}>
          <Button
            color='white'
            title='Delete'
            onPress={() => removeTodo(item)}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.page_wrapper}>
      <View style={styles.input_wrapper}>
        <Text style={styles.title}>Todo List</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.text_input}
            value={currentTodo}
            onChangeText={setCurrentTodo}
          />
          <Button title='Add Todo' onPress={addTodo} />
        </View>
      </View>
      <View style={styles.flat_list_wrapper}>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          style={{ overflow: "visible" }}
          data={todoList}
          renderItem={TodoItem}
          keyExtractor={({ key }) => key}
        />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  page_wrapper: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input_wrapper: {
    width: "100%",
    paddingTop: 60,
    padding: 20,
    backgroundColor: "white",
    zIndex: 3, // works on ios
    elevation: 3, // works on android
  },
  input_container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  text_input: {
    flex: 1,
    marginRight: 20,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#d9d9d9",
  },
  flat_list_wrapper: {
    flex: 1,
    width: "100%",
    padding: 20,
  },
  flat_list_item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  shadow_prop: {
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  flat_list_btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "red",
    borderRadius: 10,
  },
  flat_list_text: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
